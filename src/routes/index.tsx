import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Envelope } from "@/components/wedding/Envelope";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { GeorgianOrnament, GoldVine } from "@/components/wedding/Ornament";
import { RSVP } from "@/components/wedding/RSVP";
import { SeatingChart } from "@/components/wedding/SeatingChart";
import { Timeline } from "@/components/wedding/Timeline";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "სალი & ნიკო — 26.08.2026" },
      { name: "description", content: "სალისა და ნიკოს ქორწილის მოსაწვევი — 26 აგვისტო, 2026" },
      { property: "og:title", content: "სალი & ნიკო — საქორწინო მოსაწვევი" },
      { property: "og:description", content: "გეპატიჟებით ჩვენს დაუვიწყარ დღეზე" },
    ],
  }),
  component: Index,
});

function CountdownPiece({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gold-border rounded-md px-4 py-3 min-w-[72px]">
      <span className="font-custom-wedding gold-text text-4xl leading-none">{String(value).padStart(2, "0")}</span>
      <span className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">{label}</span>
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const i = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(i);
  }, []);
  const diff = Math.max(0, target.getTime() - now);
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

const DRESS_PALETTE = [
  { name: "ზურმუხტი", c: "oklch(0.32 0.10 158)" },
  { name: "ოქრო", c: "oklch(0.80 0.14 84)" },
  { name: "შამპანი", c: "oklch(0.90 0.05 88)" },
  { name: "ბეჟი", c: "oklch(0.82 0.04 80)" },
  { name: "შავი", c: "oklch(0.15 0 0)" },
  { name: "თეთრი", c: "oklch(0.97 0 0)" },
];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16"
    >
      {children}
    </motion.section>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);
  const cd = useCountdown(new Date("2026-08-26T17:00:00+04:00"));

  useEffect(() => {
    if (!opened) return;
    const timers = [
      setTimeout(() => setStep(1), 900),
      setTimeout(() => setStep(2), 2400),
      setTimeout(() => setStep(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [opened]);

  if (!opened) return <Envelope onOpen={() => setOpened(true)} />;

  return (
    <div className="relative">
      <MusicToggle />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-center justify-center px-4 overflow-hidden oil-canvas">
        <GoldVine className="absolute left-0 top-10 w-16 sm:w-24 opacity-70" />
        <GoldVine className="absolute right-0 bottom-10 w-16 sm:w-24 opacity-70 scale-x-[-1]" />

        <div className="relative text-center max-w-2xl mx-auto py-20">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="font-custom-wedding gold-text text-2xl sm:text-3xl mb-6"
              >
                გეპატიჟებით ჩვენს დაუვიწყარ დღეზე
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-custom-wedding gold-text animate-shimmer text-7xl sm:text-9xl leading-[0.95] my-4"
              >
                სალი
                <span className="block text-5xl sm:text-7xl my-2 opacity-90">&</span>
                ნიკო
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-8"
              >
                <GeorgianOrnament className="mx-auto w-56" />
                <p className="font-custom-wedding gold-text text-3xl sm:text-4xl mt-4">26.08.2026</p>

                <div className="flex justify-center gap-2 sm:gap-3 mt-8">
                  <CountdownPiece value={cd.d} label="დღე" />
                  <CountdownPiece value={cd.h} label="საათი" />
                  <CountdownPiece value={cd.m} label="წუთი" />
                  <CountdownPiece value={cd.s} label="წამი" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="brush-divider max-w-2xl mx-auto my-4" />

      {/* INVITATION TEXT */}
      <Section>
        <div className="canvas-card rounded-lg p-8 sm:p-12 text-center">
          <GeorgianOrnament className="mx-auto w-40 mb-6 opacity-80" />
          <p className="font-custom-wedding text-xl sm:text-2xl leading-relaxed gold-text">
            სიყვარულით, ტრადიციითა და ახალი დასაწყისით სავსე დღე...
          </p>
          <p className="mt-6 text-foreground/85 leading-loose text-base sm:text-lg">
            გვიხარია, რომ ჩვენი ცხოვრების ამ უმნიშვნელოვანეს მომენტს
            ჩვენს საყვარელ ადამიანებთან ერთად აღვნიშნავთ.
            ველოდებით თქვენთან შეხვედრას!
          </p>
          <GeorgianOrnament className="mx-auto w-40 mt-8 opacity-80 rotate-180" />
        </div>
      </Section>

      {/* TIMELINE */}
      <Section><Timeline /></Section>

      {/* LOCATION */}
      <Section>
        <div className="canvas-card rounded-lg p-6 sm:p-10 text-center">
          <h3 className="font-custom-wedding gold-text text-4xl">ადგილმდებარეობა</h3>
          <p className="mt-3 text-foreground/85">ვენიუ „ალავერდი" • თბილისი, საქართველო</p>
          <div
            className="mt-6 rounded-md overflow-hidden gold-border aspect-[16/9] relative"
            style={{ background: "radial-gradient(circle at 50% 50%, oklch(0.40 0.08 158), oklch(0.20 0.06 162))" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full gold-fill gold-glow flex items-center justify-center"
                style={{ background: "var(--gradient-gold)" }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="oklch(0.18 0.05 162)">
                  <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>
                </svg>
              </motion.div>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            href="https://maps.google.com/?q=Tbilisi+Georgia"
            target="_blank" rel="noreferrer"
            className="inline-block mt-6 px-8 py-3 rounded-md font-custom-wedding text-xl gold-glow"
            style={{ background: "var(--gradient-gold)", color: "oklch(0.18 0.05 162)" }}
          >
            გახსენი რუკაზე
          </motion.a>
        </div>
      </Section>

      {/* DRESS CODE */}
      <Section>
        <div className="canvas-card rounded-lg p-8 sm:p-12 text-center">
          <h3 className="font-custom-wedding gold-text text-4xl">Dress Code</h3>
          <p className="mt-2 text-foreground/85">Black Tie • Elegant & Sophisticated</p>
          <div className="flex flex-wrap justify-center gap-5 mt-8">
            {DRESS_PALETTE.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-14 h-14 rounded-full"
                  style={{
                    background: p.c,
                    boxShadow: "inset 0 -6px 12px oklch(0 0 0 / 0.35), inset 0 6px 10px oklch(1 0 0 / 0.15), 0 0 0 2px oklch(0.55 0.10 84 / 0.6)",
                  }}
                />
                <span className="text-xs text-muted-foreground tracking-wider uppercase">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* RSVP */}
      <Section><RSVP /></Section>

      {/* SEATING */}
      <Section><SeatingChart /></Section>

      {/* FOOTER */}
      <footer className="text-center py-16 px-4">
        <GeorgianOrnament className="mx-auto w-48 opacity-70" />
        <p className="font-custom-wedding gold-text text-3xl mt-4">სალი & ნიკო</p>
        <p className="text-xs text-muted-foreground mt-2 tracking-widest uppercase">26 • 08 • 2026</p>
      </footer>
    </div>
  );
}
