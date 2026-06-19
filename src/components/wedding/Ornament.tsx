import { motion } from "framer-motion";

export function GeorgianOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="orn-soft" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c9a89c" />
          <stop offset="50%" stopColor="#d8c4a8" />
          <stop offset="100%" stopColor="#a8b89c" />
        </linearGradient>
      </defs>
      <g stroke="url(#orn-soft)" strokeWidth="0.9" fill="none" strokeLinecap="round" opacity="0.85">
        <path d="M2 20 Q 30 20 50 20" />
        <path d="M50 20 C 55 10, 70 10, 75 20 C 80 30, 95 30, 100 20 C 105 10, 120 10, 125 20 C 130 30, 145 30, 150 20" />
        <path d="M150 20 Q 170 20 198 20" />
        <circle cx="100" cy="20" r="1.8" fill="url(#orn-soft)" />
        <circle cx="50" cy="20" r="1.2" fill="url(#orn-soft)" />
        <circle cx="150" cy="20" r="1.2" fill="url(#orn-soft)" />
      </g>
    </svg>
  );
}

export function GoldVine({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 200" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id="vine-soft" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c9a89c" />
          <stop offset="100%" stopColor="#a8b89c" />
        </linearGradient>
      </defs>
      <motion.g
        stroke="url(#vine-soft)" strokeWidth="0.9" fill="none" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 2.4, ease: "easeInOut" }}
      >
        <path d="M50 0 Q 20 30 50 60 T 50 120 T 50 200" />
        <path d="M40 30 Q 28 28 22 36 Q 30 40 40 38" fill="url(#vine-soft)" opacity="0.5"/>
        <path d="M60 70 Q 72 68 78 76 Q 70 80 60 78" fill="url(#vine-soft)" opacity="0.5"/>
        <path d="M40 110 Q 28 108 22 116 Q 30 120 40 118" fill="url(#vine-soft)" opacity="0.5"/>
        <path d="M60 150 Q 72 148 78 156 Q 70 160 60 158" fill="url(#vine-soft)" opacity="0.5"/>
      </motion.g>
    </svg>
  );
}
