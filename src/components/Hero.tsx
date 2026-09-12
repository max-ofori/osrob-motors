import Link from "next/link";

const SHOP_NAME = process.env.NEXT_PUBLIC_SHOP_NAME ?? "Auto Parts Shop";

export function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-ink px-5 py-7 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #fff 0px, #fff 2px, transparent 2px, transparent 14px)",
        }}
        aria-hidden
      />

      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-wider text-teal">
          Auto Parts Dealer
        </p>
        <h1 className="mt-1 font-display text-3xl font-extrabold leading-tight">
          {SHOP_NAME}
        </h1>
        <p className="mt-2 max-w-xs text-sm text-white/80">
          Browse what&apos;s in stock right now and message us directly on WhatsApp to buy.
        </p>

        <div className="mt-5 flex gap-2.5">
          <Link
            href="#catalog"
            className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink"
          >
            Shop now
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link
            href="#find-us"
            className="flex items-center gap-1.5 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white"
          >
            Find Us
          </Link>
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-3 gap-2 border-t border-white/15 pt-4 text-center">
        <TrustBadge icon="shield" label="Genuine Parts" />
        <TrustBadge icon="badge" label="Trusted Shop" />
        <TrustBadge icon="chat" label="Quick WhatsApp Reply" />
      </div>
    </section>
  );
}

function TrustBadge({ icon, label }: { icon: "shield" | "badge" | "chat"; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <TrustIcon icon={icon} />
      <span className="text-[11px] font-medium leading-tight text-white/70">{label}</span>
    </div>
  );
}

function TrustIcon({ icon }: { icon: "shield" | "badge" | "chat" }) {
  if (icon === "shield") {
    return (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    );
  }
  if (icon === "badge") {
    return (
      <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    );
  }
  return (
    <svg className="h-5 w-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}