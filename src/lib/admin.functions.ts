import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  .inputValidator((data) => z.object({ password: z.string().min(1) }).parse(data))
  .handler(async ({ data }) => {
    // ვამოწმებთ ვერსელის ცვლადს, ხოლო თუ არ წაიკითხა, ვიყენებთ პირდაპირ "ninidata20"-ს
    const expected = process.env["WEDDING_ADMIN_PASSWORD"] || "ninidata20";
    
    if (data.password !== expected) {
      return { ok: false as const };
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

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
  });
