import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import intro from "@/assets/intro.mp4";

export function IntroVideo({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, 900);
  };

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <AnimatePresence>
      {!leaving ? (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-foreground"
          onClick={finish}
        >
          <video
            ref={videoRef}
            src={intro}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={finish}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.2 }}
            onClick={(event) => {
              event.stopPropagation();
              finish();
            }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 px-7 py-2 rounded-full font-custom-wedding text-xl tracking-[0.15em]"
            style={{
              color: "oklch(0.98 0 0 / 0.85)",
              border: "1px solid oklch(1 0 0 / 0.35)",
              backdropFilter: "blur(6px)",
            }}
          >
            გახსენი
          </motion.button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
