import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/SiteHeader";
import { SearchBar } from "@/components/SearchBar";
import { CategoryRail } from "@/components/CategoryRail";
import { ProductCard } from "@/components/ProductCard";
import { FindUs } from "@/components/FindUs";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CustomerBanner } from "@/components/CustomerBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type HomeSearchParams = {
  q?: string;
  category?: string;
};

async function getCategories() {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
}

async function getProducts(searchParams: HomeSearchParams) {
  const where: Prisma.ProductWhereInput = {};

  if (searchParams.category) {
    where.categoryId = searchParams.category;
  }

  if (searchParams.q) {
    const q = searchParams.q.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { partNumber: { contains: q, mode: "insensitive" } },
      { vehicleMake: { contains: q, mode: "insensitive" } },
      { vehicleModel: { contains: q, mode: "insensitive" } },
      { category: { name: { contains: q, mode: "insensitive" } } },
    ];
  }

  return prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<HomeSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(resolvedSearchParams),
  ]);

  const activeCategory = categories.find(
    (c: (typeof categories)[number]) => c.id === resolvedSearchParams.category
  );

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-5xl px-4 pt-3 sm:px-6">
        <CustomerBanner />
      </section>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 sm:px-6">

        <div id="catalog" className="sticky top-[65px] z-10 -mx-4 mt-6 scroll-mt-16 bg-canvas px-4 pb-4 pt-3">
          <div className="rounded-2xl bg-canvas-raised p-3 shadow-sm">
            <div className="mb-3">
              <Suspense fallback={<div className="h-10" />}>
                <CategoryRail categories={categories} />
              </Suspense>
            </div>
            <Suspense fallback={<div className="h-[52px]" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        <section id="products" className="mt-4">
          <h2 className="mb-3 font-display text-lg font-bold text-ink">
            {resolvedSearchParams.q
              ? `Results for "${resolvedSearchParams.q}"`
              : activeCategory
                ? activeCategory.name
                : "Available Parts"}
            <span className="ml-2 text-sm font-normal text-steel">
              ({products.length})
            </span>
          </h2>

          {products.length === 0 ? (
            <div className="rounded-md border border-dashed border-line bg-canvas-raised px-4 py-10 text-center">
              <p className="font-medium text-ink">No parts match that search.</p>
              <p className="mt-1 text-sm text-steel">
                Try a different name, or browse another category above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((product: (typeof products)[number]) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    category: { id: product.category.id, name: product.category.name },
                  }}
                />
              ))}
            </div>
          )}
        </section>

        <FindUs />
      </main>

      <footer className="border-t border-line px-4 py-6 text-center text-xs text-steel">
        Shop owner?{" "}
        <a href="/admin" className="font-medium text-steel underline underline-offset-2">
          Manage inventory
        </a>
      </footer>
      <MobileBottomNav />
      <FloatingWhatsApp />
    </div>
  );
}