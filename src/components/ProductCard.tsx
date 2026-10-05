import Link from "next/link";
import Image from "next/image";
import { formatCedis } from "@/lib/format";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import type { ProductWithCategory } from "@/types";

export function ProductCard({ product }: { product: ProductWithCategory }) {
  return (
    <article className="group flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-[22px] border border-[#ece7df] bg-white shadow-[0_10px_30px_rgba(20,20,20,0.10)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(20,20,20,0.12)]">
      <Link href={`/products/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f0ea]">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, 30vw"
              className="object-cover p-3 transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-steel-light">
              No photo
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 px-4 pb-4 pt-4">
          <h3 className="font-display text-[1.15rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-[#111111]">
            {product.name}
          </h3>

          {product.partNumber && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7a7a74]">
              Part no. {product.partNumber}
            </p>
          )}

          <div className="mt-auto flex items-end justify-between gap-3 pt-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#d93636]">
                {product.stock > 0 ? "Available" : "Unavailable"}
              </p>
              <p className="mt-1 font-display text-[1.8rem] font-black leading-none text-[#111111]">
                {formatCedis(product.price)}
              </p>
            </div>

            <div className="rounded-full border border-[#f0c4c4] bg-[#fff2f2] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#d93636]">
              {product.stock > 0 ? "In stock" : "Sold out"}
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <a
          href={buildWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#d93636] py-2.5 text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ad2525] active:scale-[0.98]"
        >
          Buy on WhatsApp
        </a>
      </div>
    </article>
  );
}