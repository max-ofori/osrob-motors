"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatCedis } from "@/lib/format";
import type { ProductWithCategory } from "@/types";

export function InventoryRow({ product }: { product: ProductWithCategory }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;

    setDeleting(true);
    const res = await fetch(`/api/products/${product.id}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Could not delete this product. Please try again.");
      setDeleting(false);
      return;
    }

    router.refresh();
  }

  const inStock = product.stock > 0;

  return (
    <div className="flex items-center gap-3 border-b border-line py-3 last:border-0">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-line/40">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-ink">{product.name}</p>
        <div className="flex items-center gap-2 text-sm text-steel">
          <span>{formatCedis(product.price)}</span>
          <span aria-hidden>·</span>
          <span className={inStock ? "text-in-stock" : "text-out-stock"}>
            {product.stock} in stock
          </span>
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-md border border-out-stock/30 bg-out-stock-bg px-3 py-1.5 text-sm font-medium text-out-stock disabled:opacity-50"
        >
          {deleting ? "…" : "Delete"}
        </button>
      </div>
    </div>
  );
}
