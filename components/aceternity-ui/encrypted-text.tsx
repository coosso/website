"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

type EncryptedTextProps = {
  text: string;
  className?: string;
  /**
   * Time in milliseconds between revealing each subsequent real character.
   * Lower is faster. Defaults to 50ms per character.
   */
  revealDelayMs?: number;
  /** Optional custom character set to use for the gibberish effect. */
  charset?: string;
  /**
   * Time in milliseconds between gibberish flips for unrevealed characters.
   * Lower is more jittery. Defaults to 50ms.
   */
  flipDelayMs?: number;
  /** CSS class for styling the encrypted/scrambled characters */
  encryptedClassName?: string;
  /** CSS class for styling the revealed characters */
  revealedClassName?: string;
};

const DEFAULT_CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[];:,.<>/?";

function generateRandomCharacter(charset: string): string {
  const index = Math.floor(Math.random() * charset.length);
  return charset.charAt(index);
}

function generateStableCharacters(original: string, charset: string): string[] {
  return original.split("").map((character, index) => {
    if (character === " ") return " ";
    if (!charset) return "·";
    return charset.charAt(index % charset.length);
  });
}

function generateGibberishPreservingSpaces(
  original: string,
  charset: string,
): string {
  if (!original) return "";
  let result = "";
  for (let i = 0; i < original.length; i += 1) {
    const ch = original[i];
    result += ch === " " ? " " : generateRandomCharacter(charset);
  }
  return result;
}

export const EncryptedText: React.FC<EncryptedTextProps> = ({
  text,
  className,
  revealDelayMs = 50,
  charset = DEFAULT_CHARSET,
  flipDelayMs = 50,
  encryptedClassName,
  revealedClassName,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  const [revealCount, setRevealCount] = useState<number>(0);
  const [scrambleChars, setScrambleChars] = useState<string[]>(() =>
    generateStableCharacters(text, charset),
  );

  useEffect(() => {
    if (!isInView) return;

    let isCancelled = false;
    let animationFrameId: number | null = null;
    let startTime = 0;
    let lastFlipTime = 0;
    let currentScramble: string[] = [];

    const update = (now: number) => {
      if (isCancelled) return;

      const elapsedMs = now - startTime;
      const totalLength = text.length;
      const currentRevealCount = Math.min(
        totalLength,
        Math.floor(elapsedMs / Math.max(1, revealDelayMs)),
      );

      setRevealCount((previous) =>
        previous === currentRevealCount ? previous : currentRevealCount,
      );

      if (currentRevealCount >= totalLength) {
        return;
      }

      const timeSinceLastFlip = now - lastFlipTime;
      if (timeSinceLastFlip >= Math.max(0, flipDelayMs)) {
        for (let index = 0; index < totalLength; index += 1) {
          if (index >= currentRevealCount) {
            currentScramble[index] =
              text[index] === " "
                ? " "
                : generateRandomCharacter(charset);
          }
        }
        setScrambleChars([...currentScramble]);
        lastFlipTime = now;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const start = () => {
      if (isCancelled) return;
      currentScramble = generateGibberishPreservingSpaces(text, charset).split("");
      startTime = performance.now();
      lastFlipTime = startTime;
      setScrambleChars(currentScramble);
      setRevealCount(0);
      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(start);

    return () => {
      isCancelled = true;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, text, revealDelayMs, charset, flipDelayMs]);

  if (!text) return null;

  return (
    <motion.span
      ref={ref}
      className={cn(className)}
      aria-label={text}
      role="text"
    >
      {text.split("").map((char, index) => {
        const isRevealed = index < revealCount;
        const displayChar = isRevealed
          ? char
          : char === " "
            ? " "
          : (scrambleChars[index] ?? "·");

        return (
          <span
            key={index}
            className={cn(isRevealed ? revealedClassName : encryptedClassName)}
          >
            {displayChar}
          </span>
        );
      })}
    </motion.span>
  );
};
