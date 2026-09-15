"use client";

import Image from "next/image";
import Link from "next/link";
import { buildDirectionsLink } from "@/lib/shop";

const SHOP_NAME = process.env.NEXT_PUBLIC_SHOP_NAME ?? "Auto Parts Shop";

export function SiteHeader() {
  function focusSearch() {
    const searchInput = document.getElementById("product-search");
    if (searchInput instanceof HTMLInputElement) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <header className="sticky top-0 z-20 border-b border-[#e5ece9] bg-white">
      <div className="mx-auto flex h-[74px] max-w-5xl items-center justify-between px-5">
        <button type="button" onClick={focusSearch} className="flex h-10 w-10 items-center justify-center text-ink" aria-label="Search products">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path strokeLinecap="round" d="M19 19 14.7 14.7m1.3-5.2a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0Z" />
          </svg>
        </button>
        <Link href="/" className="flex items-center gap-2" aria-label={`${SHOP_NAME} home`}>
          <Image
            src="/osrob-motors.png"
            alt="Osrob Motors logo"
            width={40}
            height={40}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-sigmar text-base leading-none text-[#ad2525]">
            {SHOP_NAME}
          </span>
        </Link>
        <a href={buildDirectionsLink()} target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d93636] text-white shadow-sm" aria-label="Find us on Google Maps">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
        </a>
      </div>
    </header>
  );
}
