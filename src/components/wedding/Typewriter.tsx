import { useState, useEffect } from "react";

export function useTypewriter(text: string, startDelay = 0, speed = 42) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;

    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [started, displayed, text, speed]);

  return displayed;
}

export function TypewriterText({
  text,
  startDelay = 0,
  speed = 42,
  className = "",
  showCursor = true,
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
}) {
  const displayed = useTypewriter(text, startDelay, speed);
  const isDone = displayed.length === text.length;

  return (
    <span className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[2px] h-[1em] bg-current ml-1 align-middle ${isDone ? "animate-pulse" : "opacity-100"}`}
        />
      )}
    </span>
  );
}
