import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { GeorgianOrnament } from "./Ornament";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handle = () => {
    setOpening(true);
    setTimeout(onOpen, 1600);
  };

  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center px-4 py-12 oil-canvas">
      <AnimatePresence>
        {!opening && (
          <motion.button
            key="envelope"
            onClick={handle}
            className="relative group cursor-pointer outline-none"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, rotateX: 80, y: -200 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            aria-label="გახსენი მოსაწვევი"
          >
            <div
              className="relative w-[min(86vw,440px)] aspect-[7/5] rounded-md canvas-card overflow-hidden"
              style={{ boxShadow: "var(--shadow-canvas)" }}
            >
              {/* Envelope flap */}
              <motion.div
                className="absolute inset-x-0 top-0 origin-top"
                style={{
                  height: "55%",
                  clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                  background:
                    "linear-gradient(160deg, oklch(0.32 0.08 158), oklch(0.22 0.06 162))",
                  boxShadow: "inset 0 -20px 40px oklch(0.10 0.04 160 / 0.6)",
                }}
                animate={opening ? { rotateX: -180 } : { rotateX: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Gold borders */}
              <div className="absolute inset-3 rounded-sm pointer-events-none"
                   style={{ border: "1px solid transparent", background: "linear-gradient(transparent,transparent) padding-box, var(--gradient-gold) border-box" }} />
              {/* Wax seal */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.6, repeat: Infinity }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center font-custom-wedding text-3xl"
                  style={{
                    background: "var(--gradient-gold)",
                    color: "oklch(0.20 0.06 162)",
                    boxShadow:
                      "0 6px 20px oklch(0.55 0.12 80 / 0.6), inset 0 -4px 8px oklch(0.30 0.08 70 / 0.5), inset 0 4px 8px oklch(1 0.05 92 / 0.5)",
                  }}
                >
                  ს&ნ
                </div>
              </motion.div>
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <GeorgianOrnament className="mx-auto w-40 opacity-80" />
                <p className="font-custom-wedding gold-text text-lg mt-1">დააწკაპუნე</p>
              </div>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
