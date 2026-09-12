import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });

  return (
    <div>
      <Link href="/admin/dashboard" className="mb-3 inline-block text-sm font-medium text-steel">
        ← Back to inventory
      </Link>
      <h1 className="mb-4 font-display text-xl font-extrabold text-ink">Add Product</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
