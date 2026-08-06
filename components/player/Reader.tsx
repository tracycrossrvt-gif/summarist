"use client";

import { useState } from "react";

interface ReaderProps {
  summary: string;
}

const MIN_FONT_SIZE = 14;
const MAX_FONT_SIZE = 24;
const FONT_SIZE_STEP = 2;

export default function Reader({ summary }: ReaderProps) {
  const [fontSize, setFontSize] = useState(17);

  function decreaseFontSize() {
    setFontSize((currentSize) =>
      Math.max(currentSize - FONT_SIZE_STEP, MIN_FONT_SIZE)
    );
  }

  function increaseFontSize() {
    setFontSize((currentSize) =>
      Math.min(currentSize + FONT_SIZE_STEP, MAX_FONT_SIZE)
    );
  }

  return (
    <div className="reader">
      <div
        className="reader__controls"
        aria-label="Reading controls"
      >
        <button
          type="button"
          onClick={decreaseFontSize}
          disabled={fontSize === MIN_FONT_SIZE}
          aria-label="Decrease text size"
        >
          A−
        </button>

        <span aria-live="polite">
          {fontSize}px
        </span>

        <button
          type="button"
          onClick={increaseFontSize}
          disabled={fontSize === MAX_FONT_SIZE}
          aria-label="Increase text size"
        >
          A+
        </button>
      </div>

      <article
        className="player-page__summary"
        style={{ fontSize: `${fontSize}px` }}
      >
        {summary
          .split("\n")
          .filter((paragraph) => paragraph.trim())
          .map((paragraph, index) => (
            <p key={index}>
              {paragraph.trim()}
            </p>
          ))}
      </article>
    </div>
  );
}
