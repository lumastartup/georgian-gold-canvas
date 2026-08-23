import { motion } from "framer-motion";
import arch from "@/assets/ceremony-aisle.png.asset.json";
import dinnerTable from "@/assets/giuaani-table.jpg.asset.json";

type Step = {
  time: string;
  title: string;
  place?: string;
  map?: string;
  photo?: string;
  photoAlt?: string;
};

const STEPS: Step[] = [
  {
    time: "14:30",
    title: "ჯვრისწერა",
    place: "წმინდა მიქაელ მთავარანგელოზის ეკლესია",
    map: "https://maps.app.goo.gl/1DYsqKospN1nyFej8?g_st=ic",
  },
  {
    time: "17:30",
    title: "ხელის მოწერის ცერემონია",
    place: "გიუაანი მეღვინეობა",
    map: "https://maps.app.goo.gl/wnw1PHBeNMSh5uaU7?g_st=ic",
  },
  {
    time: "18:00",
    title: "ვახშამი",
    place: "გიუაანი მეღვინეობა",
    map: "https://maps.app.goo.gl/wnw1PHBeNMSh5uaU7?g_st=ic",
    photo: dinnerTable.url,
    photoAlt: "სადღესასწაულო ვახშმის მაგიდა",
  },
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

      {/* Ceremony aisle — framed watercolor centerpiece */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto mt-8 mb-2 w-full max-w-md rounded-md overflow-hidden gold-border aspect-[4/5] sm:aspect-[16/11]"
      >
        <img
          src={arch.url}
          alt="საქორწინო ცერემონიის ადგილი"
          draggable={false}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </motion.div>

      {/* Vertical timeline */}
      <div className="relative max-w-2xl mx-auto mt-8">
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.78 0.060 22 / 0.55), oklch(0.80 0.035 145 / 0.55), oklch(0.78 0.060 22 / 0.55), transparent)",
          }}
        />

        <ul className="space-y-10 sm:space-y-12">
          {STEPS.map((s, i) => (
            <motion.li
              key={s.time}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <span
                aria-hidden
                className="mx-auto block w-3 h-3 rounded-full mb-4"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.95 0.020 80), oklch(0.78 0.060 22))",
                  boxShadow:
                    "0 0 0 4px oklch(0.97 0.012 85 / 0.9), 0 2px 6px oklch(0.50 0.04 60 / 0.20)",
                }}
              />
              <div className="font-custom-wedding gold-text text-3xl sm:text-4xl leading-none">
                {s.time}
              </div>
              <div className="font-custom-wedding whisper text-base sm:text-lg mt-2 tracking-wide">
                {s.title}
              </div>
              {s.place && (
                <p className="whisper text-xs sm:text-sm mt-1 italic">{s.place}</p>
              )}
              {s.map && (
                <a
                  href={s.map}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block mt-3 px-5 py-2 rounded-md font-custom-wedding text-sm tracking-widest"
                  style={{
                    background:
                      "linear-gradient(160deg, oklch(0.92 0.030 25 / 0.5), oklch(0.88 0.025 145 / 0.5))",
                    color: "oklch(0.42 0.030 75)",
                    border: "1px solid oklch(0.78 0.035 60 / 0.4)",
                  }}
                >
                  რუკაზე ნახვა
                </a>
              )}
              {s.photo && (
                <div className="mx-auto mt-5 w-full max-w-md rounded-md overflow-hidden gold-border aspect-[16/10]">
                  <img
                    src={s.photo}
                    alt={s.photoAlt ?? ""}
                    draggable={false}
                    className="w-full h-full object-cover select-none"
                  />
                </div>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
