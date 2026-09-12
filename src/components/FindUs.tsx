import { getShopInfo, buildDirectionsLink } from "@/lib/shop";

export function FindUs() {
  const { name, address, phoneDisplay, hoursText } = getShopInfo();
  const directionsHref = buildDirectionsLink();

  if (!address) return null; // don't show a half-empty section if the owner hasn't set it up yet

  return (
    <section id="find-us" className="mt-8 rounded-md border border-line bg-canvas-raised p-4">
      <h2 className="font-display text-lg font-bold text-ink">Find Us</h2>

      <dl className="mt-3 flex flex-col gap-2.5 text-sm">
        <div className="flex gap-2.5">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <dd className="text-ink">{address}</dd>
        </div>

        <div className="flex gap-2.5">
          <svg className="mt-0.5 h-5 w-5 shrink-0 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <dd className="text-ink">{hoursText}</dd>
        </div>

        {phoneDisplay && (
          <div className="flex gap-2.5">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-steel" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 5a2 2 0 012-2h2.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <dd className="text-ink">{phoneDisplay}</dd>
          </div>
        )}
      </dl>

      <a
        href={directionsHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 rounded-md border border-line px-4 py-3 text-sm font-semibold text-ink"
      >
        Get Directions
      </a>

      <p className="sr-only">{name} location and opening hours</p>
    </section>
  );
}