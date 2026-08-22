import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GeorgianOrnament } from "./Ornament";
import champagne from "@/assets/champagne.png.asset.json";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handle = () => {
    setOpening(true);
    setTimeout(onOpen, 1400);
  };

  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center px-4 py-12 oil-canvas relative overflow-hidden">
      {/* Decorative champagne bottle */}
      <motion.img
        src={champagne.url}
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.35, y: 0 }}
        transition={{ duration: 1.8, delay: 0.3 }}
        className="absolute -left-10 bottom-0 h-[70vh] max-h-[640px] w-auto pointer-events-none select-none hidden sm:block"
        draggable={false}
      />
      <motion.img
        src={champagne.url}
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 20, rotate: 8 }}
        animate={{ opacity: 0.3, y: 0, rotate: 8 }}
        transition={{ duration: 1.8, delay: 0.5 }}
        className="absolute -right-16 -bottom-10 h-[80vh] max-h-[720px] w-auto pointer-events-none select-none hidden sm:block"
        draggable={false}
      />

      <AnimatePresence>
        {!opening && (
          <motion.button
            key="envelope"
            onClick={handle}
            className="relative group cursor-pointer outline-none z-10"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85, y: -40 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="გახსენი მოსაწვევი"
          >
            <div
              className="relative w-[min(86vw,420px)] aspect-[7/5] rounded-md canvas-card overflow-hidden"
            >
              <motion.div
                className="absolute inset-x-0 top-0 origin-top"
                style={{
                  height: "55%",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background:
                    "linear-gradient(160deg, oklch(0.92 0.030 25 / 0.7), oklch(0.88 0.025 145 / 0.6))",
                }}
                animate={opening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-3 rounded-sm pointer-events-none border border-[oklch(0.78_0.035_60/0.4)]" />
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center font-custom-wedding text-xl"
                  style={{
                    background: "linear-gradient(160deg, oklch(0.88 0.040 25), oklch(0.80 0.035 145))",
                    color: "oklch(0.42 0.030 75)",
                    boxShadow: "0 4px 14px oklch(0.50 0.04 60 / 0.25)",
                  }}
                >
                  ნ · დ
                </div>
              </motion.div>
              <div className="absolute bottom-5 left-0 right-0 text-center">
                <GeorgianOrnament className="mx-auto w-32 opacity-70" />
                <p className="font-custom-wedding whisper text-sm mt-1 tracking-widest">ჩვენი დღე</p>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
