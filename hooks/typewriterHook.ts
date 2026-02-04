import { useEffect, useState } from "react";

export const useTypewriter = (text: string, speed: number = 15) => {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayed("");
    if (!text) {
      setDisplayed("");
      setIsTyping(false);
      return;
    }

    let i = 0;

    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i += 1;
      if (i >= text.length - 1) {
        clearInterval(interval);
      }
    }, speed);
    return () => {
      clearInterval(interval);
      setIsTyping(false);
    };
  }, [text, speed]);

  return { displayed, isTyping };
};
