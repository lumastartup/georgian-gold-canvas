import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "yKKYpjN3N3U";

export function MusicToggle({ hidden = false }: { hidden?: boolean }) {
  const [playing, setPlaying] = useState(true);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const post = (func: string) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*",
    );
  };

  useEffect(() => {
    const start = () => {
      post("unMute");
      post("playVideo");
    };
    const t = setTimeout(start, 600);
    const onGesture = () => start();
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("touchstart", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      clearTimeout(t);
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  const toggle = () => {
    if (playing) {
      post("pauseVideo");
    } else {
      post("unMute");
      post("playVideo");
    }
    setPlaying(!playing);
  };

  return (
    <>
      <iframe
        ref={frameRef}
        title="background music"
        src={`https://www.youtube.com/embed/${VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&playsinline=1&modestbranding=1`}
        allow="autoplay; encrypted-media"
        className="pointer-events-none fixed -z-10 h-px w-px opacity-0"
        aria-hidden="true"
      />

      <motion.button
        onClick={toggle}
        className={`${hidden ? "hidden " : ""}fixed top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center gold-glow`}
        style={{
          background: "linear-gradient(160deg, oklch(1 0 0 / 0.75), oklch(0.90 0.028 80 / 0.85))",
          border: "1px solid oklch(0.78 0.035 60 / 0.45)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={playing ? "გააჩერე მუსიკა" : "ჩართე მუსიკა"}
      >
        <motion.svg
          viewBox="0 0 32 32"
          className="w-6 h-6"
          animate={playing ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 6, repeat: playing ? Infinity : 0, ease: "linear" }}
        >
          <circle cx="16" cy="16" r="14" fill="oklch(0.62 0.025 78)" opacity="0.85" />
          <circle cx="16" cy="16" r="9" fill="none" stroke="oklch(0.97 0.012 85)" strokeWidth="0.5" />
          <circle cx="16" cy="16" r="6" fill="none" stroke="oklch(0.97 0.012 85)" strokeWidth="0.5" />
          <circle cx="16" cy="16" r="3" fill="oklch(0.90 0.028 80)" />
          <circle cx="16" cy="16" r="1" fill="oklch(0.62 0.025 78)" />
        </motion.svg>
        {!playing && (
          <span
            className="absolute w-6 h-[1.5px] rotate-45"
            style={{ background: "oklch(0.42 0.030 75)" }}
          />
        )}
      </motion.button>
    </>
  );
}
