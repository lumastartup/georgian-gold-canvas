import { motion } from "framer-motion";
import { useState } from "react";
import { GeorgianOrnament } from "@/components/wedding/Ornament";

export function Wishes() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const prev = JSON.parse(localStorage.getItem("wedding-wishes") || "[]");
      prev.push({ name: name.trim() || "ანონიმური", message: message.trim(), at: new Date().toISOString() });
      localStorage.setItem("wedding-wishes", JSON.stringify(prev));
    } catch {}
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="canvas-card rounded-lg p-10 text-center"
      >
        <GeorgianOrnament className="mx-auto w-32 mb-4" />
        <p className="whisper text-[10px] uppercase tracking-[0.4em]">with love</p>
        <h3 className="font-custom-wedding gold-text text-3xl mt-2">გულითადი მადლობა</h3>
        <p className="mt-4 whisper text-sm leading-loose max-w-sm mx-auto">
          თქვენი თბილი სიტყვები მივიღეთ — ისინი ჩვენი დღის ნაწილი გახდება.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="canvas-card rounded-lg p-6 sm:p-10 space-y-6">
      <div className="text-center">
        <GeorgianOrnament className="mx-auto w-32 mb-3" />
        <p className="whisper text-[10px] uppercase tracking-[0.4em]">wishes</p>
        <h3 className="font-custom-wedding gold-text text-3xl mt-2">სურვილების კონვერტი</h3>
        <p className="mt-4 whisper text-sm leading-loose max-w-md mx-auto">
          ჩვენთვის თქვენი ყოველი ძვირფასი სიტყვა, დალოცვა და კეთილი სურვილები მნიშვნელოვანია.
          სურვილისამებრ გაგვიზიარეთ თქვენი განწყობა.
        </p>
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-2">თქვენი სახელი</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 rounded-md gold-border focus:outline-none focus:gold-glow bg-transparent"
        />
      </div>

      <div>
        <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-2">მისალოცი სიტყვა</label>
        <textarea
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="დაწერეთ რამდენიმე თბილი სიტყვა…"
          className="w-full px-4 py-3 rounded-md gold-border focus:outline-none focus:gold-glow bg-transparent resize-none whisper"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
        className="w-full py-3 rounded-md font-custom-wedding text-lg tracking-widest gold-glow"
        style={{
          background: "linear-gradient(160deg, oklch(0.88 0.040 25 / 0.7), oklch(0.80 0.035 145 / 0.7))",
          color: "oklch(0.42 0.030 75)",
          border: "1px solid oklch(0.78 0.035 60 / 0.4)",
        }}
      >
        გავგზავნოთ კონვერტი
      </motion.button>
    </form>
  );
}
