import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GeorgianOrnament } from "@/components/wedding/Ornament";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "ადმინ პანელი — ნინი & დათა" },
      { name: "description", content: "სტუმრების დადასტურებები და სურვილები." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="canvas-card rounded-lg px-6 py-5 text-center min-w-[120px] flex-1">
      <p className="whisper text-[9px] uppercase tracking-[0.3em]">{label}</p>
      <p className="font-custom-wedding gold-text text-4xl mt-1">{value}</p>
    </div>
  );
}

function AdminPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-data-direct"],
    queryFn: async () => {
      const [rsvpsRes, wishesRes] = await Promise.all([
        supabase.from("rsvps").select("*").order("created_at", { ascending: false }),
        supabase.from("wishes").select("*").order("created_at", { ascending: false }),
      ]);

      if (rsvpsRes.error) throw rsvpsRes.error;
      if (wishesRes.error) throw wishesRes.error;

      return {
        rsvps: rsvpsRes.data || [],
        wishes: wishesRes.data || [],
      };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen oil-canvas flex items-center justify-center">
        <p className="whisper text-sm tracking-[0.3em] uppercase">იტვირთება…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen oil-canvas flex items-center justify-center p-6 text-center">
        <p className="whisper text-sm">დაფიქსირდა შეცდომა მონაცემების ჩატვირთვისას.</p>
      </div>
    );
  }

  const rsvps = data?.rsvps || [];
  const wishes = data?.wishes || [];
  const coming = rsvps.filter((r) => r.attending);
  const notComing = rsvps.filter((r) => !r.attending);

  const exportExcel = () => {
    const wb = XLSX.utils.book_new();
    const rsvpSheet = XLSX.utils.json_to_sheet(
      rsvps.map((r) => ({
        სახელი: r.name,
        ესწრება: r.attending ? "კი" : "არა",
        სტუმრები: r.guests || "",
        თანმხლები: r.companion_name || "",
        დრო: new Date(r.created_at).toLocaleString("ka-GE"),
      })),
    );
    const wishSheet = XLSX.utils.json_to_sheet(
      wishes.map((w) => ({
        სახელი: w.name || "ანონიმური",
        სურვილი: w.message,
        დრო: new Date(w.created_at).toLocaleString("ka-GE"),
      })),
    );
    XLSX.utils.book_append_sheet(wb, rsvpSheet, "სტუმრები");
    XLSX.utils.book_append_sheet(wb, wishSheet, "სურვილები");
    XLSX.writeFile(wb, "nini-data-wedding.xlsx");
  };

  return (
    <div className="min-h-screen oil-canvas py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <GeorgianOrnament className="mx-auto w-40 mb-3" />
          <p className="whisper text-[10px] uppercase tracking-[0.4em]">admin</p>
          <h1 className="font-custom-wedding gold-text sparkle-text text-4xl mt-2">
            სტუმრების სია
          </h1>
        </header>

        <div className="flex flex-wrap gap-4">
          <Stat label="მოდის" value={coming.length} />
          <Stat label="ვერ მოდის" value={notComing.length} />
          <Stat label="სურვილები" value={wishes.length} />
        </div>

        <div className="text-center">
          <button
            onClick={exportExcel}
            className="px-8 py-3 rounded-md font-custom-wedding text-lg tracking-widest gold-glow"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.88 0.040 25 / 0.7), oklch(0.80 0.035 145 / 0.7))",
              color: "oklch(0.42 0.030 75)",
              border: "1px solid oklch(0.78 0.035 60 / 0.4)",
            }}
          >
            ექსელში ჩამოტვირთვა
          </button>
        </div>

        {/* RSVPs */}
        <section className="canvas-card rounded-lg p-5 sm:p-8 space-y-5">
          <h2 className="font-custom-wedding gold-text text-2xl text-center">
            დადასტურებები ({rsvps.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="whisper text-[9px] uppercase tracking-[0.25em]">
                  <th className="pb-3 pr-3">სახელი</th>
                  <th className="pb-3 pr-3">ესწრება</th>
                  <th className="pb-3 pr-3">სტუმრები</th>
                  <th className="pb-3 pr-3">თანმხლები</th>
                  <th className="pb-3">დრო</th>
                </tr>
              </thead>
              <tbody className="whisper">
                {rsvps.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center opacity-60">
                      ჯერ მონაცემები არ არის.
                    </td>
                  </tr>
                ) : (
                  rsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-t border-[oklch(0.78_0.035_60_/_0.25)]">
                      <td className="py-3 pr-3 font-custom-wedding text-base gold-text">
                        {rsvp.name}
                      </td>
                      <td className="py-3 pr-3">{rsvp.attending ? "კი" : "ვერ ახერხებს"}</td>
                      <td className="py-3 pr-3">{rsvp.guests || "—"}</td>
                      <td className="py-3 pr-3">{rsvp.companion_name || "—"}</td>
                      <td className="py-3 text-[11px] opacity-70">
                        {new Date(rsvp.created_at).toLocaleString("ka-GE")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Wishes */}
        <section className="canvas-card rounded-lg p-5 sm:p-8 space-y-5">
          <h2 className="font-custom-wedding gold-text text-2xl text-center">
            სურვილები ({wishes.length})
          </h2>
          <div className="space-y-3">
            {wishes.length === 0 ? (
              <p className="whisper text-sm text-center opacity-60">ჯერ სურვილები არ არის.</p>
            ) : (
              wishes.map((wish) => (
                <div key={wish.id} className="rounded-md gold-border p-4 space-y-1">
                  <p className="font-custom-wedding gold-text text-lg">
                    {wish.name || "ანონიმური"}
                  </p>
                  <p className="whisper text-sm leading-loose">{wish.message}</p>
                  <p className="whisper text-[10px] opacity-60 pt-1">
                    {new Date(wish.created_at).toLocaleString("ka-GE")}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
