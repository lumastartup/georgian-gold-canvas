import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { Database } from "@/integrations/supabase/types";

type Rsvp = Database["public"]["Tables"]["rsvps"]["Row"];
type Wish = Database["public"]["Tables"]["wishes"]["Row"];

export type AdminResult =
  | { ok: true; rsvps: Rsvp[]; wishes: Wish[] }
  | { ok: false; code: "UNAUTHORIZED" | "NOT_CONFIGURED" | "SERVER_ERROR"; message: string };

export const getAdminData = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<AdminResult> => {
    const expected = (process.env["WEDDING_ADMIN_PASSWORD"] ?? "").trim();

    if (!expected) {
      return {
        ok: false,
        code: "NOT_CONFIGURED",
        message: "WEDDING_ADMIN_PASSWORD არ არის კონფიგურირებული სერვერზე.",
      };
    }

    if (data.password.trim() !== expected) {
      return { ok: false, code: "UNAUTHORIZED", message: "პაროლი არასწორია" };
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const [rsvpsRes, wishesRes] = await Promise.all([
        supabaseAdmin.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (rsvpsRes.error) throw rsvpsRes.error;
      if (wishesRes.error) throw wishesRes.error;

      return {
        ok: true,
        rsvps: rsvpsRes.data ?? [],
        wishes: wishesRes.data ?? [],
      };
    } catch (error) {
      console.error("[admin] data fetch failed", error);
      return {
        ok: false,
        code: "SERVER_ERROR",
        message:
          error instanceof Error && error.message.includes("SUPABASE")
            ? "სერვერზე ბაზის გასაღები (SUPABASE_SERVICE_ROLE_KEY) არ არის მითითებული."
            : "მონაცემების წამოღება ვერ მოხერხდა.",
      };
    }
  });

export type DeleteResult = { ok: true } | { ok: false; message: string };

export const deleteAdminRecord = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        password: z.string().min(1),
        table: z.enum(["rsvps", "wishes"]),
        id: z.string().uuid(),
      })
      .parse(data),
  )
  .handler(async ({ data }): Promise<DeleteResult> => {
    const expected = (process.env["WEDDING_ADMIN_PASSWORD"] ?? "").trim();
    if (!expected) return { ok: false, message: "სერვერი არ არის კონფიგურირებული." };
    if (data.password.trim() !== expected) return { ok: false, message: "პაროლი არასწორია" };

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { error } = await supabaseAdmin.from(data.table).delete().eq("id", data.id);
      if (error) throw error;
      return { ok: true };
    } catch (error) {
      console.error("[admin] delete failed", error);
      return { ok: false, message: "წაშლა ვერ მოხერხდა." };
    }
  });
