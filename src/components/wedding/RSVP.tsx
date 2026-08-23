import { motion } from "framer-motion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function RSVP() {
  const [submitted, setSubmitted] = useState(false);
  const [attending, setAttending] = useState<"yes" | "no" | "">("");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("მხოლოდ მე");
  const [menu, setMenu] = useState("სტანდარტული");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!attending) {
      setError("აირჩიეთ დასწრება");
      return;
    }
    setBusy(true);
    setError("");
    const { error: dbError } = await supabase.from("rsvps").insert({
      name: name.trim(),
      attending: attending === "yes",
      guests: attending === "yes" ? guests : null,
      menu: attending === "yes" ? menu : null,
    });
    setBusy(false);
    if (dbError) {
      setError("ვერ გაიგზავნა, სცადეთ თავიდან");
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="canvas-card rounded-lg p-10 text-center"
      >
        <p className="whisper text-[10px] uppercase tracking-[0.4em]">thank you</p>
        <h3 className="font-custom-wedding gold-text text-4xl mt-2">მადლობა</h3>
        <p className="mt-4 whisper text-sm">პასუხი მიღებულია.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative w-full mx-auto max-w-xl canvas-card rounded-lg">
      <form onSubmit={submit} className="relative space-y-5 p-6 sm:p-10">
        <div className="text-center">
          <h3 className="font-custom-wedding gold-text text-2xl sm:text-3xl">დაგვიდასტურეთ თქვენი მობრძანება</h3>
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-2">სახელი და გვარი</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-md gold-border focus:outline-none focus:gold-glow bg-transparent"
          />
        </div>

        <div>
          <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-3">დასწრება</label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { v: "yes", label: "მოვდივარ" },
              { v: "no", label: "სამწუხაროდ ვერ ვახერხებ" },
            ].map((o) => (
              <button
                type="button"
                key={o.v}
                onClick={() => setAttending(o.v as "yes" | "no")}
                className={`px-3 py-3 rounded-md transition-all font-custom-wedding text-base ${
                  attending === o.v ? "gold-fill gold-glow" : "gold-border whisper"
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
              <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-2">სტუმრები</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-4 py-3 rounded-md gold-border focus:outline-none focus:gold-glow"
              >
                <option className="bg-card">მხოლოდ მე</option>
                <option className="bg-card">+1 თანმხლები</option>
                <option className="bg-card">ოჯახით</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] tracking-[0.3em] uppercase whisper mb-2">მენიუ</label>
              <select
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                className="w-full px-4 py-3 rounded-md gold-border focus:outline-none focus:gold-glow"
              >
                <option className="bg-card">სტანდარტული</option>
                <option className="bg-card">სამარხვო</option>
                <option className="bg-card">ვეგეტარიანული</option>
                <option className="bg-card">განსაკუთრებული</option>
              </select>
            </div>
          </motion.div>
        )}

        {error && <p className="text-sm text-center text-destructive">{error}</p>}

        <motion.button
          disabled={busy}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full py-3 rounded-md font-custom-wedding text-lg tracking-widest gold-glow disabled:opacity-60"
          style={{
            background: "linear-gradient(160deg, oklch(0.88 0.040 25 / 0.7), oklch(0.80 0.035 145 / 0.7))",
            color: "oklch(0.42 0.030 75)",
            border: "1px solid oklch(0.78 0.035 60 / 0.4)",
          }}
        >
          {busy ? "..." : "გაგზავნა"}
        </motion.button>
      </form>
    </div>
  );
}
