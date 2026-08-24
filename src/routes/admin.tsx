import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import * as XLSX from "xlsx";
import { getAdminData, type RsvpRow, type WishRow } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "ადმინ პანელი — ნინი & დათა" },
      { name: "description", content: "დახურული პანელი დადასტურებებისა და სურვილების სანახავად." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "ადმინ პანელი" },
      { property: "og:description", content: "დახურული პანელი." },
    ],
  }),
  component: AdminPage,
});

function fmt(d: string) {
  return new Date(d).toLocaleString("ka-GE");
}

function AdminPage() {
  const load = useServerFn(getAdminData);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [rsvps, setRsvps] = useState<RsvpRow[] | null>(null);
  const [wishes, setWishes] = useState<WishRow[]>([]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await load({ data: { password } });
      if (!res.ok) {
        setError("პაროლი არასწორია");
      } else {
        setRsvps(res.rsvps);
        setWishes(res.wishes);
      }
    } catch {
      setError("დაფიქსირდა შეცდომა, სცადეთ თავიდან");
    }
    setBusy(false);
  };

  const exportExcel = () => {
    if (!rsvps) return;
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        rsvps.map((r) => ({
          სახელი: r.name,
          სტატუსი: r.attending ? "მოდის" : "ვერ მოდის",
          სტუმრები: r.guests ?? "",
          მენიუ: r.menu ?? "",
          თარიღი: fmt(r.created_at),
        })),
      ),
      "დადასტურებები",
    );
    XLSX.utils.book_append_sheet(
      wb,
      XLSX.utils.json_to_sheet(
        wishes.map((w) => ({
          სახელი: w.name || "ანონიმური",
          სურვილი: w.message,
          თარიღი: fmt(w.created_at),
        })),
      ),
      "სურვილები",
    );
    XLSX.writeFile(wb, "nini-data-wedding.xlsx");
  };

  if (!rsvps) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center px-4">
        <form
          onSubmit={submit}
          className="canvas-card rounded-lg p-8 w-full max-w-sm space-y-5 text-center"
        >
          <p className="whisper text-[10px] uppercase tracking-[0.4em]">private</p>
          <h1 className="font-custom-wedding gold-text text-3xl">ადმინ პანელი</h1>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="პაროლი"
            className="w-full px-4 py-3 rounded-md gold-border bg-transparent focus:outline-none focus:gold-glow text-center"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            disabled={busy}
            className="w-full py-3 rounded-md font-custom-wedding text-lg tracking-widest gold-glow disabled:opacity-60"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.88 0.040 25 / 0.7), oklch(0.80 0.035 145 / 0.7))",
              color: "oklch(0.42 0.030 75)",
              border: "1px solid oklch(0.78 0.035 60 / 0.4)",
            }}
          >
            {busy ? "..." : "შესვლა"}
          </button>
        </form>
      </div>
    );
  }

  const coming = rsvps.filter((r) => r.attending);
  const notComing = rsvps.filter((r) => !r.attending);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <header className="text-center">
        <h1 className="font-custom-wedding gold-text text-4xl">ადმინ პანელი</h1>
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <Stat label="მოდის" value={coming.length} />
          <Stat label="ვერ მოდის" value={notComing.length} />
          <Stat label="სურვილები" value={wishes.length} />
        </div>
        <button
          onClick={exportExcel}
          className="mt-6 px-6 py-3 rounded-md font-custom-wedding tracking-widest gold-border"
        >
          ექსელში ექსპორტი
        </button>
      </header>

      <GuestTable title="მოდის" rows={coming} />
      <GuestTable title="ვერ მოდის" rows={notComing} />

      <section className="canvas-card rounded-lg p-6">
        <h2 className="font-custom-wedding gold-text text-2xl mb-4">სურვილები</h2>
        {wishes.length === 0 ? (
          <p className="whisper text-sm">ჯერ ცარიელია.</p>
        ) : (
          <ul className="space-y-4">
            {wishes.map((w) => (
              <li key={w.id} className="gold-border rounded-md p-4">
                <p className="font-custom-wedding gold-text text-lg">{w.name || "ანონიმური"}</p>
                <p className="whisper text-sm mt-1 leading-loose whitespace-pre-wrap">
                  {w.message}
                </p>
                <p className="whisper text-[10px] mt-2 tracking-widest">{fmt(w.created_at)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="gold-border rounded-md px-5 py-3 min-w-[100px]">
      <p className="font-custom-wedding gold-text text-3xl leading-none">{value}</p>
      <p className="whisper text-[9px] uppercase tracking-[0.25em] mt-1">{label}</p>
    </div>
  );
}

function GuestTable({ title, rows }: { title: string; rows: RsvpRow[] }) {
  return (
    <section className="canvas-card rounded-lg p-6">
      <h2 className="font-custom-wedding gold-text text-2xl mb-4">{title}</h2>
      {rows.length === 0 ? (
        <p className="whisper text-sm">ჯერ ცარიელია.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="whisper text-[10px] uppercase tracking-[0.25em]">
                <th className="text-left py-2">სახელი</th>
                <th className="text-left py-2">სტუმრები</th>
                <th className="text-left py-2">მენიუ</th>
                <th className="text-left py-2">თარიღი</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[oklch(0.78_0.035_60_/_0.25)]">
                  <td className="py-2 pr-3">{r.name}</td>
                  <td className="py-2 pr-3 whisper">{r.guests || "—"}</td>
                  <td className="py-2 pr-3 whisper">{r.menu || "—"}</td>
                  <td className="py-2 whisper text-xs">{fmt(r.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
