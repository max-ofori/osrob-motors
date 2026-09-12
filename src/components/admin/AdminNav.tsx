"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Inventory" },
  { href: "/admin/categories", label: "Categories" },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 bg-ink text-canvas-raised">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <span className="font-display text-base font-extrabold">Shop Admin</span>
        <button
          onClick={handleLogout}
          className="text-xs font-medium text-steel-light underline underline-offset-2"
        >
          Log out
        </button>
      </div>
      <nav className="mx-auto flex max-w-3xl gap-1 px-4 pb-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium ${
              pathname.startsWith(link.href)
                ? "bg-canvas-raised text-ink"
                : "text-steel-light"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
