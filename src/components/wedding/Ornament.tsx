import { motion } from "framer-motion";

export function GeorgianOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="orn-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#9a7029" />
          <stop offset="35%" stopColor="#f5d684" />
          <stop offset="65%" stopColor="#c9962f" />
          <stop offset="100%" stopColor="#fff0b8" />
        </linearGradient>
      </defs>
      <g stroke="url(#orn-gold)" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M2 20 Q 30 20 50 20" />
        <path d="M50 20 C 55 8, 70 8, 75 20 C 80 32, 95 32, 100 20 C 105 8, 120 8, 125 20 C 130 32, 145 32, 150 20" />
        <path d="M150 20 Q 170 20 198 20" />
        <circle cx="100" cy="20" r="2.5" fill="url(#orn-gold)" />
        <circle cx="50" cy="20" r="1.6" fill="url(#orn-gold)" />
        <circle cx="150" cy="20" r="1.6" fill="url(#orn-gold)" />
        <path d="M100 14 L100 8 M100 32 L100 26" />
      </g>
    </svg>
  );
}

export function GoldVine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 200" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="vine-gold" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#9a7029" />
          <stop offset="50%" stopColor="#f5d684" />
          <stop offset="100%" stopColor="#c9962f" />
        </linearGradient>
      </defs>
      <motion.g
        stroke="url(#vine-gold)" strokeWidth="1.2" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      >
        <path d="M50 0 Q 20 30 50 60 T 50 120 T 50 200" />
        <path d="M40 30 Q 28 28 22 36 Q 30 40 40 38" fill="url(#vine-gold)" opacity="0.7"/>
        <path d="M60 70 Q 72 68 78 76 Q 70 80 60 78" fill="url(#vine-gold)" opacity="0.7"/>
        <path d="M40 110 Q 28 108 22 116 Q 30 120 40 118" fill="url(#vine-gold)" opacity="0.7"/>
        <path d="M60 150 Q 72 148 78 156 Q 70 160 60 158" fill="url(#vine-gold)" opacity="0.7"/>
      </motion.g>
    </svg>
  );
}
