export function formatCedis(amountInPesewas: number): string {
  const cedis = amountInPesewas / 100;
  return `GH₵${cedis.toLocaleString("en-GH", {
    minimumFractionDigits: cedis % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}
