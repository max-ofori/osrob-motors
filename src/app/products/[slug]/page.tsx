import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/SiteHeader";
import { StockBadge } from "@/components/StockBadge";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { formatCedis } from "@/lib/format";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Part not found" };

  return {
    title: `${product.name} | ${formatCedis(product.price)}`,
    description:
      product.description ??
      `${product.name} available in ${product.category.name}. Contact us on WhatsApp to buy.`,
    keywords: [
      product.name,
      product.category.name,
      product.partNumber,
      product.vehicleMake,
      product.vehicleModel,
      "auto parts",
      "car parts",
    ].filter((value): value is string => Boolean(value)),
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} | ${formatCedis(product.price)}`,
      description:
        product.description ??
        `${product.name} available in ${product.category.name}. Contact us on WhatsApp to buy.`,
      images: product.image ? [{ url: product.image, alt: product.name }] : undefined,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) notFound();

  const compatibility = [product.vehicleMake, product.vehicleModel, product.year]
    .filter(Boolean)
    .join(" ");

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const productUrl = `${siteUrl}/products/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? `${product.name} available from ${product.category.name}.`,
    url: productUrl,
    ...(product.image ? { image: [`${siteUrl}${product.image}`] } : {}),
    category: product.category.name,
    ...(product.partNumber ? { mpn: product.partNumber } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "GHS",
      price: (product.price / 100).toFixed(2),
      availability: product.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-28 pt-4">
        <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-steel">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to parts
        </Link>

        <div className="relative aspect-square w-full overflow-hidden rounded-md bg-line/40">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-steel-light">
              No photo available
            </div>
          )}
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wide text-steel">
            {product.category.name}
          </span>
          <h1 className="font-display text-2xl font-extrabold text-ink">{product.name}</h1>

          <div className="mt-2 flex items-center gap-3">
            <span className="font-display text-2xl font-extrabold text-ink">
              {formatCedis(product.price)}
            </span>
            <StockBadge stock={product.stock} />
          </div>

          <p className="mt-2 text-sm font-semibold text-steel">
            {product.stock > 0 ? `${product.stock} available` : "Currently unavailable"}
          </p>

          <dl className="mt-5 divide-y divide-line rounded-md border border-line bg-canvas-raised">
            {product.partNumber && (
              <div className="flex justify-between px-4 py-3 text-sm">
                <dt className="text-steel">Part Number</dt>
                <dd className="font-medium text-ink">{product.partNumber}</dd>
              </div>
            )}
            {compatibility && (
              <div className="flex justify-between px-4 py-3 text-sm">
                <dt className="text-steel">Compatible with</dt>
                <dd className="font-medium text-ink text-right">{compatibility}</dd>
              </div>
            )}
          </dl>

          {product.description && (
            <p className="mt-5 text-sm leading-relaxed text-ink">{product.description}</p>
          )}
        </div>
      </main>

      <div className="sticky bottom-0 border-t border-line bg-canvas-raised px-4 py-3">
        <div className="mx-auto max-w-2xl">
          <WhatsAppButton productName={product.name} />
        </div>
      </div>
    </div>
  );
}
