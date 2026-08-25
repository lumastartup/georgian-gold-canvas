import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getAdminData = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    const expected = process.env["WEDDING_ADMIN_PASSWORD"];
    if (!expected || data.password !== expected) {
      throw new Error("UNAUTHORIZED");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const [rsvpsRes, wishesRes] = await Promise.all([
      supabaseAdmin.from("rsvps").select("*").order("created_at", { ascending: false }),
      supabaseAdmin.from("wishes").select("*").order("created_at", { ascending: false }),
    ]);

    if (rsvpsRes.error) throw rsvpsRes.error;
    if (wishesRes.error) throw wishesRes.error;

    return {
      rsvps: rsvpsRes.data ?? [],
      wishes: wishesRes.data ?? [],
    };
  });
