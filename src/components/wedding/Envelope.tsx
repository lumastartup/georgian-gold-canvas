import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import pinkEnvelope from "@/assets/pink-envelope.jpg.asset.json";
import pinkEnvelopeNoSeal from "@/assets/pink-envelope-no-seal.jpg.asset.json";

export function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const handle = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onOpen, 1750);
  };

  return (
    <AnimatePresence>
      <motion.button
        type="button"
        onClick={handle}
        className="fixed inset-0 z-50 flex min-h-[100svh] w-full cursor-pointer overflow-hidden bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        initial={{ opacity: 0 }}
        animate={{ opacity: opening ? 0 : 1 }}
        transition={opening
          ? { duration: 0.55, delay: 1.12, ease: "easeInOut" }
          : { duration: 0.8, ease: "easeOut" }}
        aria-label="გახსენი მოსაწვევი"
        aria-busy={opening}
      >
        <motion.div
          className="relative h-full w-full overflow-hidden shadow-2xl"
          style={{ perspective: 1500 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: opening ? 0 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src={pinkEnvelopeNoSeal.url}
            alt="ვარდისფერი საქორწინო კონვერტი მაქმანითა და ცვილის ბეჭდით"
            className="absolute inset-0 h-full w-full rounded-sm object-cover select-none"
            draggable={false}
          />

          {/* The shadowed inside is revealed as the flap leaves the envelope. */}
          <motion.div
            className="absolute inset-0 bg-blush-deep"
            style={{ clipPath: "polygon(0 0, 100% 0, 50% 60%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: opening ? 0.48 : 0 }}
            transition={{ duration: 0.35, delay: opening ? 0.3 : 0 }}
          />

          {/* A duplicate of the photographed flap preserves the lace detail while folding. */}
          <motion.div
            className="absolute inset-0 origin-top"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 60%)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
            animate={{ rotateX: opening ? -178 : 0 }}
            transition={{ duration: 0.9, delay: opening ? 0.48 : 0, ease: [0.65, 0, 0.35, 1] }}
          >
            <img
              src={pinkEnvelopeNoSeal.url}
              alt=""
              aria-hidden
              className="h-full w-full object-cover select-none"
              draggable={false}
            />
          </motion.div>

          {/* Isolated photographed seal dissolves before the flap begins to move. */}
          <AnimatePresence>
            {!opening && (
              <motion.div
                className="absolute inset-0 z-20"
                style={{ clipPath: "circle(8.5% at 50% 59%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: [1, 1.025, 1], filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.18, filter: "blur(8px)" }}
                transition={{ duration: 0.42, ease: "easeOut" }}
              >
                <img
                  src={pinkEnvelope.url}
                  alt=""
                  aria-hidden
                  className="h-full w-full object-cover select-none"
                  draggable={false}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
    </AnimatePresence>
  );
}
