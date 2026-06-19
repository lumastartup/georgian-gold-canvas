import { motion } from "framer-motion";
import arch from "@/assets/ceremony-arch.png.asset.json";

const STEPS = [
  { time: "14:00", title: "მზადება" },
  { time: "15:30", title: "ჯვრისწერა" },
  { time: "17:00", title: "Welcome Drinks" },
  { time: "18:00", title: "ვახშამი" },
  { time: "19:00", title: "ფოტოსესია" },
  { time: "20:00", title: "ტორტი" },
  { time: "21:00", title: "პირველი ცეკვა" },
  { time: "22:00", title: "მუსიკა" },
  { time: "00:00", title: "Night Party" },
];

export function Timeline() {
  return (
    <div className="canvas-card rounded-lg px-6 pt-12 pb-16 sm:px-12 sm:pt-16 sm:pb-20 relative overflow-hidden">
      {/* Header */}
      <div className="text-center relative z-10">
        <p className="whisper text-[10px] uppercase tracking-[0.45em] mb-3">our day · ჩვენი დღე</p>
        <h3 className="font-custom-wedding gold-text text-4xl sm:text-5xl mb-2">დღის განრიგი</h3>
        <p className="whisper text-xs sm:text-sm mt-2 italic">წუთები, რომელთაც ერთად გავიზიარებთ</p>
      </div>

      {/* Ceremony arch — centered watercolor centerpiece */}
      <motion.img
        src={arch.url}
        alt=""
        aria-hidden
        draggable={false}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="block mx-auto w-[78%] sm:w-[55%] max-w-md h-auto select-none pointer-events-none mt-6 mb-2 drop-shadow-[0_8px_20px_rgba(120,90,60,0.12)]"
      />

      {/* Vertical alternating timeline */}
      <div className="relative max-w-2xl mx-auto mt-8">
        {/* center painted line */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.78 0.060 22 / 0.55), oklch(0.80 0.035 145 / 0.55), oklch(0.78 0.060 22 / 0.55), transparent)",
          }}
        />

        <ul className="space-y-6 sm:space-y-8">
          {STEPS.map((s, i) => {
            const left = i % 2 === 0;
            return (
              <motion.li
                key={s.time}
                initial={{ opacity: 0, x: left ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex items-center"
              >
                {/* dot */}
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, oklch(0.95 0.020 80), oklch(0.78 0.060 22))",
                    boxShadow:
                      "0 0 0 4px oklch(0.97 0.012 85 / 0.9), 0 2px 6px oklch(0.50 0.04 60 / 0.20)",
                  }}
                />

                {/* card */}
                <div
                  className={`w-[calc(50%-1.25rem)] ${
                    left ? "pr-6 text-right" : "ml-auto pl-6 text-left"
                  }`}
                >
                  <div className="font-custom-wedding gold-text text-2xl sm:text-3xl leading-none">
                    {s.time}
                  </div>
                  <div className="font-custom-wedding whisper text-sm sm:text-base mt-1 tracking-wide">
                    {s.title}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
