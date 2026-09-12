export function ProductsTabs() {
  return (
    <div className="flex gap-1 rounded-[26px] bg-white p-1.5 shadow-[0_4px_18px_rgba(62,92,83,0.08)]">
      <span className="flex-1 rounded-[22px] bg-ink py-3 text-center text-sm font-semibold text-white">
        Products
      </span>
      <span
        className="flex-1 cursor-not-allowed rounded-[22px] py-3 text-center text-sm font-semibold text-steel-light"
        title="Not available yet"
      >
        Custom
      </span>
      <span
        className="flex-1 cursor-not-allowed rounded-[22px] py-3 text-center text-sm font-semibold text-steel-light"
        title="Not available yet"
      >
        Upload
      </span>
    </div>
  );
}