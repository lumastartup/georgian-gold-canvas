import { motion } from "framer-motion";
import { useState } from "react";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no" | "">("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="canvas-card rounded-lg p-10 text-center"
      >
        <h3 className="font-custom-wedding gold-text text-5xl">მადლობა!</h3>
        <p className="mt-4 text-foreground/80">თქვენი პასუხი მიღებულია. ველოდებით თქვენთან შეხვედრას.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className="canvas-card rounded-lg p-6 sm:p-10 space-y-6">
      <h3 className="font-custom-wedding gold-text text-4xl text-center">დაგვიდასტურეთ</h3>

      <div>
        <label className="block text-sm tracking-wider uppercase text-muted-foreground mb-2">სახელი და გვარი</label>
        <input required className="w-full px-4 py-3 rounded-md bg-transparent gold-border focus:outline-none focus:gold-glow" />
      </div>

      <div>
        <label className="block text-sm tracking-wider uppercase text-muted-foreground mb-3">დასწრება</label>
        <div className="grid grid-cols-2 gap-3">
          {[
            { v: "yes", label: "მოვდივარ" },
            { v: "no", label: "სამწუხაროდ ვერ ვახერხებ" },
          ].map((o) => (
            <button
              type="button"
              key={o.v}
              onClick={() => setAttending(o.v as "yes" | "no")}
              className={`px-3 py-3 rounded-md transition-all font-custom-wedding text-lg ${
                attending === o.v ? "gold-fill gold-glow" : "gold-border text-foreground/80"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {attending === "yes" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-6 overflow-hidden">
          <div>
            <label className="block text-sm tracking-wider uppercase text-muted-foreground mb-2">სტუმრების რაოდენობა</label>
            <select className="w-full px-4 py-3 rounded-md bg-transparent gold-border focus:outline-none focus:gold-glow">
              <option className="bg-card">მხოლოდ მე</option>
              <option className="bg-card">+1 თანმხლები</option>
              <option className="bg-card">ოჯახით</option>
            </select>
          </div>
          <div>
            <label className="block text-sm tracking-wider uppercase text-muted-foreground mb-2">კვების უპირატესობა</label>
            <select className="w-full px-4 py-3 rounded-md bg-transparent gold-border focus:outline-none focus:gold-glow">
              <option className="bg-card">სტანდარტული მენიუ</option>
              <option className="bg-card">სამარხვო მენიუ</option>
              <option className="bg-card">ვეგეტარიანული</option>
              <option className="bg-card">ალერგია / განსაკუთრებული</option>
            </select>
          </div>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-md gold-fill gold-glow font-custom-wedding text-2xl animate-shimmer"
        style={{ background: "var(--gradient-gold)" }}
      >
        გავგზავნოთ პასუხი
      </motion.button>
    </form>
  );
}
