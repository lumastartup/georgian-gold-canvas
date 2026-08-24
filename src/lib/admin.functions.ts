import { createServerFn } from "@tanstack/react-start";

export type RsvpRow = {
  id: string;
  name: string;
  attending: boolean;
  guests: string | null;
  menu: string | null;
  created_at: string;
};

export type WishRow = {
  id: string;
  name: string | null;
  message: string;
  created_at: string;
};

export const getAdminData = createServerFn({ method: "POST" })
  .handler(async () => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const [rsvps, wishes] = await Promise.all([
        supabaseAdmin.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (rsvps.error) throw new Error(`RSVP Error: ${rsvps.error.message}`);
      if (wishes.error) throw new Error(`Wishes Error: ${wishes.error.message}`);

      return {
        ok: true as const,
        rsvps: (rsvps.data ?? []) as RsvpRow[],
        wishes: (wishes.data ?? []) as WishRow[],
      };
    } catch (err: any) {
      console.error("ADMIN ERROR:", err?.message || err);
      throw new Error(err?.message || "Database connection error");
    }
  });
