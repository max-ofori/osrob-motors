import Link from "next/link";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21v-6h6v6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path strokeLinecap="round" d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}

export function MobileBottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-[#e4ebe8] bg-white/95 px-8 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_18px_rgba(44,70,63,0.08)] backdrop-blur md:hidden" aria-label="Primary navigation">
      <div className="mx-auto grid max-w-sm grid-cols-3 items-end">
        <NavItem href="#top" label="Home" icon={<HomeIcon />} />
        <NavItem href="#find-us" label="Find Us" icon={<LocationIcon />} />
        <NavItem href="#products" label="Products" icon={<ProductsIcon />} />
      </div>
    </nav>
  );
}

function NavItem({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 text-[#697773]">
      <span className="h-6 w-6">{icon}</span>
      <span className="text-[11px] font-semibold">{label}</span>
    </Link>
  );
}
