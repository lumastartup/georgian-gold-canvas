import { motion } from "framer-motion";

const STEPS = [
  { time: "15:00", title: "ჯვრისწერა", place: "სამება, თბილისი" },
  { time: "17:00", title: "ხელმოწერა", place: "სამოქალაქო რეესტრი" },
  { time: "19:00", title: "მისაღები & ფოტოსესია", place: "ვენიუ" },
  { time: "20:00", title: "საქორწინო წვეულება", place: "ვენიუ — დიდი დარბაზი" },
  { time: "23:00", title: "ცეკვები & სუფრა გრძელდება", place: "" },
];

export function Timeline() {
  return (
    <div className="canvas-card rounded-lg p-6 sm:p-10">
      <h3 className="font-custom-wedding gold-text text-4xl text-center mb-10">დღის განრიგი</h3>
      <div className="relative max-w-xl mx-auto">
        <div
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2"
          style={{ background: "var(--gradient-gold)", boxShadow: "0 0 10px oklch(0.85 0.13 88 / 0.5)" }}
        />
        {STEPS.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className={`relative pl-12 sm:pl-0 mb-8 sm:grid sm:grid-cols-2 sm:gap-12 ${
              i % 2 === 0 ? "" : "sm:[&>*:first-child]:col-start-2"
            }`}
          >
            <div
              className="absolute left-4 sm:left-1/2 top-2 w-4 h-4 rounded-full -translate-x-1/2 z-10"
              style={{ background: "var(--gradient-gold)", boxShadow: "0 0 12px oklch(0.85 0.13 88 / 0.8)" }}
            />
            <div className={i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8"}>
              <div className="font-custom-wedding gold-text text-3xl">{s.time}</div>
              <div className="text-foreground font-semibold">{s.title}</div>
              {s.place && <div className="text-sm text-muted-foreground">{s.place}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
