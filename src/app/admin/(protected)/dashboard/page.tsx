import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { InventoryRow } from "@/components/admin/InventoryRow";

export default async function AdminDashboardPage() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const total = products.length;
  const inStock = products.filter((p: { stock: number }) => p.stock > 0).length;
  const outOfStock = total - inStock;

  return (
    <div>
      <h1 className="font-display text-xl font-extrabold text-ink">Inventory</h1>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatCard label="Total Products" value={total} />
        <StatCard label="In Stock" value={inStock} tone="in-stock" />
        <StatCard label="Out of Stock" value={outOfStock} tone="out-stock" />
      </div>

      <Link
        href="/admin/products/new"
        className="mt-4 flex items-center justify-center gap-2 rounded-md bg-amber px-4 py-3.5 text-base font-semibold text-ink"
      >
        + Add Product
      </Link>

      <div className="mt-5 rounded-md border border-line bg-canvas-raised px-4">
        {products.length === 0 ? (
          <div className="py-10 text-center">
            <p className="font-medium text-ink">No products yet.</p>
            <p className="mt-1 text-sm text-steel">Add your first product to get started.</p>
          </div>
        ) : (
          products.map((product: (typeof products)[number]) => (
            <InventoryRow
              key={product.id}
              product={{
                ...product,
                category: { id: product.category.id, name: product.category.name },
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "in-stock" | "out-stock";
}) {
  const valueColor =
    tone === "in-stock" ? "text-in-stock" : tone === "out-stock" ? "text-out-stock" : "text-ink";

  return (
    <div className="rounded-md border border-line bg-canvas-raised px-3 py-3 text-center">
      <p className={`font-display text-2xl font-extrabold ${valueColor}`}>{value}</p>
      <p className="mt-0.5 text-xs font-medium text-steel">{label}</p>
    </div>
  );
}
