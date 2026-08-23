import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Envelope } from "@/components/wedding/Envelope";
import { MusicToggle } from "@/components/wedding/MusicToggle";
import { GeorgianOrnament, GoldVine } from "@/components/wedding/Ornament";
import { RSVP } from "@/components/wedding/RSVP";
import { Timeline } from "@/components/wedding/Timeline";
import { TypewriterText } from "@/components/wedding/Typewriter";
import { Wishes } from "@/components/wedding/Wishes";
import { createFileRoute } from "@tanstack/react-router";
import champagne from "@/assets/champagne.png.asset.json";
import giuaani from "@/assets/giuaani.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ნინი & დათა — 20.09.2026" },
      { name: "description", content: "ნინისა და დათას ქორწილის მოსაწვევი — გიუაანი მეღვინეობა, 20 სექტემბერი, 2026" },
      { property: "og:title", content: "ნინი & დათა — საქორწინო მოსაწვევი" },
      { property: "og:description", content: "გიუაანი მეღვინეობა · 20.09.2026" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function CountdownPiece({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gold-border rounded-md px-4 py-3 min-w-[68px]">
      <span className="font-custom-wedding gold-text text-3xl leading-none">{String(value).padStart(2, "0")}</span>
      <span className="text-[9px] tracking-[0.25em] uppercase whisper mt-1">{label}</span>
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
  { name: "ბლაში", c: "oklch(0.88 0.040 25)" },
  { name: "შამპანი", c: "oklch(0.90 0.028 80)" },
  { name: "სეიჯი", c: "oklch(0.80 0.035 145)" },
  { name: "კრემი", c: "oklch(0.94 0.018 82)" },
  { name: "ბეჟი", c: "oklch(0.82 0.030 75)" },
  { name: "მტრედი", c: "oklch(0.72 0.020 250)" },
];

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-14"
    >
      {children}
    </motion.section>
  );
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);
  const cd = useCountdown(new Date("2026-09-20T14:30:00+04:00"));

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
        <GoldVine className="absolute left-0 top-10 w-14 sm:w-20 opacity-50" />
        <GoldVine className="absolute right-0 bottom-10 w-14 sm:w-20 opacity-50 scale-x-[-1]" />
        <img
          src={champagne.url}
          alt=""
          aria-hidden
          className="absolute -right-10 bottom-0 h-[55vh] max-h-[520px] w-auto opacity-25 pointer-events-none select-none"
          draggable={false}
        />

        <div className="relative text-center max-w-2xl mx-auto py-20 z-10">
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="whisper text-xs sm:text-sm uppercase tracking-[0.4em] mb-8"
              >
                save the date
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 2 && (
              <motion.h1
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="font-custom-wedding gold-text text-6xl sm:text-8xl leading-[1.0] my-2"
              >
                ნინი
                <span className="block whisper-soft text-3xl sm:text-5xl my-3 italic">&amp;</span>
                დათა
              </motion.h1>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="mt-10"
              >
                <GeorgianOrnament className="mx-auto w-44" />
                <p className="font-custom-wedding whisper text-xl sm:text-2xl mt-3 tracking-[0.3em]">20 · 09 · 2026</p>

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

      <div className="brush-divider max-w-xl mx-auto my-2" />

      {/* INVITATION TEXT */}
      <Section>
        <div className="canvas-card rounded-lg p-8 sm:p-12 text-center">
          <GeorgianOrnament className="mx-auto w-36 mb-6" />
          <p className="whisper text-[10px] uppercase tracking-[0.4em] mb-4 min-h-[1.25rem]">
            <TypewriterText text="გეპატიჟებით" startDelay={300} speed={55} />
          </p>
          <p className="font-custom-wedding gold-text text-lg sm:text-xl leading-relaxed min-h-[3.5rem]">
            <TypewriterText
              text="სიყვარულით, ბედნიერებით და ახალი დასაწყისით სავსე დღე"
              startDelay={900}
              speed={42}
            />
          </p>
          <p className="mt-5 whisper text-sm sm:text-base leading-loose max-w-md mx-auto min-h-[3rem]">
            <TypewriterText
              text="ჩვენი ცხოვრების უმნიშვნელოვანეს მომენტს თქვენთან ერთად აღვნიშნავთ."
              startDelay={3600}
              speed={40}
            />
          </p>
          <GeorgianOrnament className="mx-auto w-36 mt-7 rotate-180" />
        </div>
      </Section>

      {/* TIMELINE */}
      <Section><Timeline /></Section>

      {/* LOCATION */}
      <Section>
        <div className="canvas-card rounded-lg p-6 sm:p-10 text-center">
          <p className="whisper text-[10px] uppercase tracking-[0.4em]">venue</p>
          <h3 className="font-custom-wedding gold-text text-3xl mt-2">გიუაანი მეღვინეობა</h3>
          <p className="mt-2 whisper text-sm">ხელის მოწერა და ვახშამი · კახეთი</p>

          <div className="mt-6 rounded-md overflow-hidden gold-border aspect-[16/9] relative">
            <img
              src={giuaani.url}
              alt="გიუაანი მეღვინეობა — ვახშამის ადგილი"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <motion.a
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            href="https://maps.app.goo.gl/wnw1PHBeNMSh5uaU7?g_st=ic"
            target="_blank" rel="noreferrer"
            className="inline-block mt-6 px-7 py-3 rounded-md font-custom-wedding text-base tracking-widest"
            style={{
              background: "linear-gradient(160deg, oklch(0.92 0.030 25 / 0.5), oklch(0.88 0.025 145 / 0.5))",
              color: "oklch(0.42 0.030 75)",
              border: "1px solid oklch(0.78 0.035 60 / 0.4)",
            }}
          >
            გახსენი რუკაზე
          </motion.a>
        </div>
      </Section>

      {/* DRESS CODE */}
      <Section>
        <div className="canvas-card rounded-lg p-8 sm:p-12 text-center">
          <p className="whisper text-[10px] uppercase tracking-[0.4em]">dress code</p>
          <h3 className="font-custom-wedding gold-text text-3xl mt-2">დრესკოდი</h3>
          <p className="mt-5 whisper text-sm sm:text-base leading-loose max-w-md mx-auto">
            განსაკუთრებული შეზღუდვა ფერებთან დაკავშირებით არ არის — შეგიძლიათ მოირგოთ
            თქვენთვის სასურველი და კომფორტული სამოსი, რომელიც ზოგად სადღესასწაულო
            ატმოსფეროს მოუხდება.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-8">
            {DRESS_PALETTE.map((p) => (
              <div key={p.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{
                    background: p.c,
                    boxShadow:
                      "inset 0 -4px 8px oklch(0 0 0 / 0.10), inset 0 4px 8px oklch(1 0 0 / 0.5), 0 2px 6px oklch(0.50 0.04 60 / 0.15)",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* RSVP */}
      <Section><RSVP /></Section>


      {/* WISHES */}
      <Section><Wishes /></Section>

      {/* FOOTER */}
      <footer className="text-center py-16 px-4">
        <GeorgianOrnament className="mx-auto w-44 opacity-70" />
        <p className="font-custom-wedding gold-text text-2xl mt-4">ნინი &amp; დათა</p>
        <p className="text-[10px] whisper mt-2 tracking-[0.4em]">20 · 09 · 2026 · გიუაანი</p>
      </footer>
    </div>
  );
}
