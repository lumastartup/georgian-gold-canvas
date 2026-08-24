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
  .validator((d: { password?: string }) => d)
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      // შევამოწმოთ პაროლი admin_settings ცხრილიდან
      const { data: settingData, error: settingError } = await supabaseAdmin
        .from("admin_settings")
        .select("value")
        .eq("key", "admin_password")
        .single();

      if (settingError || !settingData || settingData.value !== data?.password) {
        return { ok: false as const, error: "არასწორი პაროლი" };
      }

      const [rsvps, wishes] = await Promise.all([
        supabaseAdmin.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabaseAdmin.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (rsvps.error) throw new Error(rsvps.error.message);
      if (wishes.error) throw new Error(wishes.error.message);

      return {
        ok: true as const,
        rsvps: (rsvps.data ?? []) as RsvpRow[],
        wishes: (wishes.data ?? []) as WishRow[],
      };
    } catch (err: any) {
      console.error("ADMIN ERROR:", err);
      throw new Error(err?.message || "Database connection error");
    }
  });
