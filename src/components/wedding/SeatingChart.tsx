import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const TABLES: { id: number; guests: string[] }[] = [
  { id: 1, guests: ["ნინო გელაშვილი", "გიორგი ბერიძე", "თამარ კვირიკაშვილი", "ლევან ჩხეიძე", "ანა მაისურაძე"] },
  { id: 2, guests: ["დავით ხარაძე", "მარიამ ჯავახიშვილი", "ირაკლი წერეთელი", "ქეთევან ლომიძე"] },
  { id: 3, guests: ["სოფიო ჩიქოვანი", "ვახტანგ ნოზაძე", "ნანა გაბუნია", "ზურაბ ჩავჭავაძე", "ლია ცინცაძე"] },
  { id: 4, guests: ["ბექა შენგელია", "თეა მგელაძე", "გიორგი წულაძე", "ლანა ბარათაშვილი"] },
  { id: 5, guests: ["ნიკოლოზ ფირცხალავა", "ეკატერინე ორბელიანი", "შოთა გურამიშვილი", "მაია ჭელიძე"] },
  { id: 6, guests: ["რევაზ აბაშიძე", "ხატია გოგუაძე", "სანდრო ციცქიშვილი", "ბარბარე ფანჯიკიძე"] },
];

export function SeatingChart() {
  const [q, setQ] = useState("");
  const match = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (v.length < 2) return null;
    for (const t of TABLES) {
      const g = t.guests.find((x) => x.toLowerCase().includes(v));
      if (g) return { table: t, guest: g };
    }
    return { table: null, guest: null };
  }, [q]);

  return (
    <div className="canvas-card rounded-lg p-6 sm:p-8">
      <h3 className="font-custom-wedding gold-text text-4xl text-center">მაგიდის განლაგება</h3>
      <p className="text-center text-sm text-muted-foreground mt-2 mb-6">
        ჩაწერეთ თქვენი სახელი — გაგინათდებათ თქვენი მაგიდა
      </p>

      <div className="max-w-md mx-auto mb-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="თქვენი სახელი და გვარი..."
          className="w-full px-5 py-3 rounded-md bg-transparent gold-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:gold-glow"
        />
      </div>

      {match?.table === null && (
        <p className="text-center text-sm text-muted-foreground">სტუმარი ვერ მოიძებნა — გთხოვთ შეამოწმოთ მართლწერა.</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
        {TABLES.map((t) => {
          const lit = match?.table?.id === t.id;
          return (
            <motion.div
              key={t.id}
              animate={lit ? { scale: 1.05 } : { scale: 1 }}
              className="relative rounded-full aspect-square flex flex-col items-center justify-center text-center p-3 transition-all"
              style={{
                background: lit
                  ? "radial-gradient(circle, oklch(0.45 0.10 88 / 0.8), oklch(0.28 0.07 160))"
                  : "radial-gradient(circle, oklch(0.32 0.08 158), oklch(0.22 0.06 162))",
                border: "1px solid oklch(0.55 0.10 84 / 0.5)",
                boxShadow: lit
                  ? "0 0 40px oklch(0.85 0.13 88 / 0.7), inset 0 0 30px oklch(0.85 0.13 88 / 0.3)"
                  : "inset 0 0 20px oklch(0.10 0.04 160 / 0.6)",
              }}
            >
              <span className="font-custom-wedding gold-text text-3xl">{t.id}</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">მაგიდა</span>
              {lit && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-64 max-w-[80vw] canvas-card rounded-md p-3 text-xs z-10"
                >
                  <div className="gold-text font-custom-wedding text-base mb-1">თქვენი მაგიდა</div>
                  <ul className="space-y-1">
                    {t.guests.map((g) => (
                      <li key={g} className={g === match?.guest ? "text-accent font-semibold" : "text-foreground/80"}>
                        {g}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
