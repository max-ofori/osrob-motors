"use client";

import { useEffect, useState, type ReactNode } from "react";

export function ProductCarousel({ children }: { children: ReactNode }) {
  const slides = Array.isArray(children) ? children : [children];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  function moveProducts(direction: -1 | 1) {
    setActiveIndex((current) => (current + direction + slides.length) % slides.length);
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <button
        type="button"
        onClick={() => moveProducts(-1)}
        aria-label="Show previous product"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#171717] text-white shadow-md transition hover:border-[#d93636] hover:bg-[#d93636] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d93636] sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="min-w-0 flex-1 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full px-1">
              {slide}
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => moveProducts(1)}
        aria-label="Show next product"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#333] bg-[#171717] text-white shadow-md transition hover:border-[#d93636] hover:bg-[#d93636] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d93636] sm:h-11 sm:w-11"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}