import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

type AdminRow = Record<string, unknown>;

export type AdminResult =
  | { ok: true; rsvps: AdminRow[]; wishes: AdminRow[] }
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
        rsvps: (rsvpsRes.data ?? []) as AdminRow[],
        wishes: (wishesRes.data ?? []) as AdminRow[],
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
