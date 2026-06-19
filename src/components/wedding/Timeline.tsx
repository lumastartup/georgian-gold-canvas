import { motion } from "framer-motion";
import timelineIcons from "@/assets/timeline-icons.png.asset.json";

const STEPS = [
  { time: "14:00", title: "მზადება" },
  { time: "15:30", title: "ჯვრისწერა" },
  { time: "17:00", title: "მისაღები" },
  { time: "18:00", title: "ვახშამი" },
  { time: "19:00", title: "ფოტოსესია" },
  { time: "20:00", title: "ტორტი" },
  { time: "21:00", title: "პირველი ცეკვა" },
  { time: "22:00", title: "მუსიკა" },
  { time: "00:00", title: "გაცილება" },
];

// 9 icons, evenly spaced across the strip
const ICON_COUNT = 9;

export function Timeline() {
  return (
    <div className="canvas-card rounded-lg p-6 sm:p-10">
      <p className="text-center whisper text-xs uppercase tracking-[0.35em] mb-2">our day</p>
      <h3 className="font-custom-wedding gold-text text-3xl text-center mb-8">დღის განრიგი</h3>

      {/* Watercolor icon strip */}
      <div className="hidden sm:block relative mx-auto max-w-3xl mb-6">
        <img
          src={timelineIcons.url}
          alt=""
          className="w-full h-auto select-none pointer-events-none"
          draggable={false}
        />
      </div>

      {/* Mobile: per-step icon */}
      <div className="grid grid-cols-3 gap-x-3 gap-y-6 sm:hidden">
        {STEPS.map((s, i) => {
          const idx = Math.min(i, ICON_COUNT - 1);
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex flex-col items-center text-center"
            >
              <div
                className="w-14 h-14"
                style={{
                  backgroundImage: `url(${timelineIcons.url})`,
                  backgroundSize: `${ICON_COUNT * 100}% 100%`,
                  backgroundPosition: `${(idx / (ICON_COUNT - 1)) * 100}% center`,
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="font-custom-wedding gold-text text-lg mt-1">{s.time}</div>
              <div className="whisper text-[11px] mt-0.5">{s.title}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop list under the strip */}
      <div className="hidden sm:grid grid-cols-9 gap-2 max-w-3xl mx-auto">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="text-center"
          >
            <div className="font-custom-wedding gold-text text-base">{s.time}</div>
            <div className="whisper text-[10px] uppercase tracking-wider mt-0.5">{s.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
