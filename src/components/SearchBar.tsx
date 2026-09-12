"use client";

import { useSearchParams } from "next/navigation";

export function SearchBar({ placeholder = "Search for a part, e.g. Corolla brake pad" }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const currentQuery = searchParams.get("q") ?? "";

  return (
    <form action="/" method="get" className="flex gap-2">
      {activeCategory && (
        <input type="hidden" name="category" value={activeCategory} />
      )}
      <div className="relative flex-1">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-steel-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          id="product-search"
          type="search"
          name="q"
          defaultValue={currentQuery}
          placeholder={placeholder}
          className="w-full rounded-full border border-line bg-white py-3.5 pl-11 pr-4 text-sm text-ink placeholder:text-steel-light focus:outline-none focus:ring-2 focus:ring-amber"
        />
      </div>
      <button
        type="submit"
        className="hidden rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white sm:block"
      >
        Search
      </button>
    </form>
  );
}
