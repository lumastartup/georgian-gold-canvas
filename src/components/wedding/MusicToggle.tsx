import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const a = new Audio("https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc9c8f2.mp3?filename=romantic-piano-15467.mp3");
    a.loop = true;
    a.volume = 0.5;
    ref.current = a;
    return () => { a.pause(); };
  }, []);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) ref.current.pause();
    else ref.current.play().catch(() => {});
    setPlaying(!playing);
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full flex items-center justify-center gold-glow"
      style={{ background: "var(--gradient-gold)" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      aria-label={playing ? "გააჩერე მუსიკა" : "ჩართე მუსიკა"}
    >
      <motion.svg
        viewBox="0 0 32 32" className="w-7 h-7"
        animate={playing ? { rotate: 360 } : { rotate: 0 }}
        transition={{ duration: 5, repeat: playing ? Infinity : 0, ease: "linear" }}
      >
        <circle cx="16" cy="16" r="14" fill="oklch(0.18 0.05 162)" />
        <circle cx="16" cy="16" r="9" fill="none" stroke="oklch(0.55 0.10 84)" strokeWidth="0.4"/>
        <circle cx="16" cy="16" r="6" fill="none" stroke="oklch(0.55 0.10 84)" strokeWidth="0.4"/>
        <circle cx="16" cy="16" r="3" fill="oklch(0.88 0.13 88)" />
        <circle cx="16" cy="16" r="1" fill="oklch(0.20 0.06 162)" />
      </motion.svg>
    </motion.button>
  );
}
