import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-xl font-extrabold text-ink">Part not found</h1>
        <p className="mt-1 text-sm text-steel">
          This part may have been sold or removed from the shop.
        </p>
        <Link
          href="/"
          className="mt-5 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-canvas-raised"
        >
          Back to all parts
        </Link>
      </main>
    </div>
  );
}
