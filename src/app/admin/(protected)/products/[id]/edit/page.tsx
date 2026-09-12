import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/admin/ProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!product) notFound();

  return (
    <div>
      <Link href="/admin/dashboard" className="mb-3 inline-block text-sm font-medium text-steel">
        ← Back to inventory
      </Link>
      <h1 className="mb-4 font-display text-xl font-extrabold text-ink">Edit Product</h1>
      <ProductForm
        categories={categories}
        initialValues={{
          id: product.id,
          name: product.name,
          categoryId: product.categoryId,
          price: (product.price / 100).toString(),
          stock: product.stock.toString(),
          image: product.image,
          partNumber: product.partNumber ?? "",
          vehicleMake: product.vehicleMake ?? "",
          vehicleModel: product.vehicleModel ?? "",
          year: product.year ?? "",
          description: product.description ?? "",
        }}
      />
    </div>
  );
}
