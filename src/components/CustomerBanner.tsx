"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const searchSteps = [
  { number: "01", label: "Model" },
  { number: "02", label: "Year of manufacture" },
  { number: "03", label: "Make of the car" },
  { number: "04", label: "Engine" },
];

const benefits = [
  { icon: "shield", title: "Over 50,000", detail: "replacement parts" },
  { icon: "truck", title: "Free shipping", detail: "on qualifying orders" },
  { icon: "clock", title: "30-day", detail: "return policy" },
] as const;

const promotionSlides = [
  {
    eyebrow: "Featured offer",
    title: "All motor oils only now",
    highlight: "in stock",
    button: "Browse products",
    image: "/banner.jpg",
    imageAlt: "Motor oil product",
  },
  {
    eyebrow: "Featured offer",
    title: "All auto parts",
    highlight: "in stock",
    button: "Browse products",
    image: "/bannerr.jpg",
    imageAlt: "Motor oil product",
  },
  {
    eyebrow: "Featured offer",
    title: "All car tyres available",
    highlight: "up to -15%",
    button: "Browse products",
    image: "/bannerrr.jpg",
    imageAlt: "Motor oil product",
  },
];

export function CustomerBanner() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % promotionSlides.length);
    }, 4000);

    return () => window.clearInterval(timer);
  }, []);

  function moveSlide(direction: 1 | -1) {
    setActiveSlide((current) => (current + direction + promotionSlides.length) % promotionSlides.length);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-[#d9e0e5] bg-white shadow-[0_5px_20px_rgba(43,55,66,0.08)]" aria-label="Find your car part">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        <div className="border-b border-[#e1e6ea] bg-[#fafbfc] p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d93636]">Parts finder</p>
          <h1 className="mt-1 font-display text-2xl font-extrabold leading-tight text-[#171b1d] sm:text-3xl">
            Search for parts by car
          </h1>
          <p className="mt-2 max-w-sm text-xs leading-5 text-[#687773]">
            Find the right replacement parts for your vehicle in a few quick steps.
          </p>

          <div className="mt-5 grid gap-2">
            {searchSteps.map((step) => (
              <button key={step.number} type="button" className="flex items-center gap-2.5 rounded-lg border border-[#dfe5e9] bg-white px-3 py-2.5 text-left shadow-sm transition-colors hover:border-[#d93636]">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#f1b2b2] text-[10px] font-bold text-[#d93636]">
                  {step.number}
                </span>
                <span className="flex-1 text-xs font-semibold text-[#455158]">{step.label}</span>
                <svg className="h-4 w-4 text-[#89959b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>

          <a href="#products" className="mt-5 inline-flex rounded-md bg-[#d93636] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-[#ad2525]">
            Search for parts
          </a>
        </div>

        <div className="relative min-h-[315px] overflow-hidden bg-[#f4f6f7]">
          <div
            className="flex h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {promotionSlides.map((slide, index) => (
              <div key={`${slide.title}-${index}`} className="relative min-w-full p-5 sm:p-7">
                <div className="relative z-10 max-w-[58%]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d93636]">{slide.eyebrow}</p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold leading-[0.98] text-[#171b1d] sm:text-4xl">
                    {slide.title} <span className="text-[#d93636]">{slide.highlight}</span>
                  </h2>
                  <a href="#products" className="mt-5 inline-flex rounded-md bg-[#d93636] px-4 py-2 text-xs font-bold text-white">
                    {slide.button}
                  </a>
                </div>
                <Image
                  src={slide.image}
                  alt={slide.imageAlt}
                  width={240}
                  height={240}
                  priority={index === 0}
                  className="absolute bottom-2 right-2 h-[82%] w-[52%] object-contain object-right-bottom sm:right-7"
                />
                <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border-[34px] border-white/70" aria-hidden />
              </div>
            ))}
          </div>
          <div className="absolute bottom-4 left-5 z-10 flex gap-2 sm:left-7">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous promotion" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4dce1] bg-white text-[#687773]">‹</button>
            <button type="button" onClick={() => moveSlide(1)} aria-label="Next promotion" className="flex h-7 w-7 items-center justify-center rounded-full border border-[#d4dce1] bg-white text-[#687773]">›</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-[#e1e6ea] bg-white px-3 py-3 sm:px-6">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="flex items-center justify-center gap-2 border-r border-[#e1e6ea] px-2 last:border-r-0 sm:gap-3">
            <BenefitIcon type={benefit.icon} />
            <p className="hidden text-[10px] leading-tight text-[#687773] sm:block">
              <span className="block font-bold text-[#d93636]">{benefit.title}</span>
              {benefit.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BenefitIcon({ type }: { type: "shield" | "truck" | "clock" }) {
  const path = type === "shield"
    ? "M12 3 4.5 6v5c0 4.6 3.2 8.7 7.5 10 4.3-1.3 7.5-5.4 7.5-10V6L12 3Z"
    : type === "truck"
      ? "M3 6h11v9H3zM14 9h4l3 3v3h-7zM7 18a1.5 1.5 0 1 0 0 .01M18 18a1.5 1.5 0 1 0 0 .01"
      : "M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z";

  return (
    <svg className="h-6 w-6 shrink-0 text-[#d93636]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
