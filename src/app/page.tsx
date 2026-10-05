import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/SiteHeader";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";
import { FindUs } from "@/components/FindUs";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { CustomerBanner } from "@/components/CustomerBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ShopMap } from "@/components/ShopMap";
import type { Prisma } from "@prisma/client";

export const dynamic = "force-dynamic";

type HomeSearchParams = {
  q?: string;
};

async function getProducts(searchParams: HomeSearchParams) {
  const where: Prisma.ProductWhereInput = {};

  if (searchParams.q) {
    const q = searchParams.q.trim();
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { partNumber: { contains: q, mode: "insensitive" } },
      { vehicleMake: { contains: q, mode: "insensitive" } },
      { vehicleModel: { contains: q, mode: "insensitive" } },
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
  const products = await getProducts(resolvedSearchParams);

  return (
    <div id="top" className="flex min-h-screen flex-col">
      <SiteHeader />

      <section className="mx-auto w-full max-w-5xl px-4 pt-3 sm:px-6">
        <CustomerBanner />
      </section>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-28 sm:px-6">
        <div id="catalog" className="sticky top-[65px] z-10 -mx-4 mt-6 scroll-mt-16 bg-canvas px-4 pb-4 pt-3">
          <div className="rounded-2xl bg-canvas-raised p-3 shadow-sm">
            <Suspense fallback={<div className="h-[52px]" />}>
              <SearchBar />
            </Suspense>
          </div>
        </div>

        <section id="products" className="mt-4">
          <h2 className="mb-3 font-display text-lg font-bold text-ink">
            {resolvedSearchParams.q ? `Results for "${resolvedSearchParams.q}"` : "Available Parts"}
            <span className="ml-2 text-sm font-normal text-steel">({products.length})</span>
          </h2>

          {products.length === 0 ? (
            <div className="rounded-md border border-dashed border-line bg-canvas-raised px-4 py-10 text-center">
              <p className="font-medium text-ink">No parts match that search.</p>
              <p className="mt-1 text-sm text-steel">Try a different name or search for another part.</p>
            </div>
          ) : (
            <ProductCarousel>
              {products.map((product: (typeof products)[number]) => (
                <ProductCard
                  key={product.id}
                  product={{
                    ...product,
                    category: { id: product.category.id, name: product.category.name },
                  }}
                />
              ))}
            </ProductCarousel>
          )}
        </section>

        <FindUs />
        <ShopMap />
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