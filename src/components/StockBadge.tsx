export function StockBadge({ stock }: { stock: number }) {
  const inStock = stock > 0;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-sm ${
        inStock ? "bg-in-stock-bg text-in-stock" : "bg-out-stock-bg text-out-stock"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-in-stock" : "bg-out-stock"}`}
        aria-hidden
      />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}
