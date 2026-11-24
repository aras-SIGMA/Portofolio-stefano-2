import { useEffect, useState } from "react";

export function useTypewriter(words: string[], speed = 80, pause = 1500) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: number;

    if (!deleting && text === word) {
      timeout = window.setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = window.setTimeout(
        () => {
          setText(
            deleting
              ? word.slice(0, text.length - 1)
              : word.slice(0, text.length + 1),
          );
        },
        deleting ? speed / 2 : speed,
      );
    }

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}
