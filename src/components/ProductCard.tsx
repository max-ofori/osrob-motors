import Link from "next/link";
import Image from "next/image";
import { formatCedis } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { ProductWithCategory } from "@/types";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border-r-2 border-[#d93636]/45 bg-white shadow-[0_3px_14px_rgba(64,89,82,0.09)]">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square bg-white">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-contain p-4"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-steel-light">
              No photo
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-1 px-3.5 pt-2.5">
          <span className="text-[11px] font-bold text-teal uppercase tracking-wide">
            {product.category.name}
          </span>
          <h3 className="font-display text-sm font-bold text-ink leading-snug line-clamp-2">
            {product.name}
          </h3>
          <p className="font-display text-xl font-extrabold text-ink">
            {formatCedis(product.price)}
          </p>
        </div>
      </Link>

      <div className="grid grid-cols-2 gap-2 px-3.5 pb-3.5 pt-2.5">
        <Link
          href={`/products/${product.slug}`}
          className="flex w-full items-center justify-center rounded-full border border-[#d93636] py-3 text-sm font-semibold text-[#d93636] transition-colors hover:bg-[#fff1f1]"
        >
          View
        </Link>
        <a
          href={buildWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[#d93636] py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
        >
          Buy
        </a>
      </div>
    </div>
  );
}