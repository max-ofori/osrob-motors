import { prisma } from "@/lib/prisma";
import { CategoryManager } from "@/components/admin/CategoryManager";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <h1 className="mb-4 font-display text-xl font-extrabold text-ink">Categories</h1>
      <CategoryManager initialCategories={categories} />
    </div>
  );
}
