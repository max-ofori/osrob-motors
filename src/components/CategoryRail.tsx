"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { CategoryOption } from "@/types";

export function CategoryRail({ categories }: { categories: CategoryOption[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const search = searchParams.get("q");

  function hrefFor(categoryId: string | null) {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (categoryId) params.set("category", categoryId);
    const qs = params.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
      <Link
        href={hrefFor(null)}
        className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
          !activeCategory
            ? "bg-ink text-white border-ink"
            : "bg-white text-ink border-line"
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={hrefFor(category.id)}
          className={`shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors ${
            activeCategory === category.id
              ? "bg-ink text-white border-ink"
              : "bg-white text-ink border-line"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
