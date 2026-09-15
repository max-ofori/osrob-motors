import { getShopInfo } from "@/lib/shop";

/**
 * Two ways to configure the map — pick whichever is easier for you:
 *
 * OPTION A (easiest, no API key): In Google Maps, find your shop, click
 * "Share" → "Embed a map", copy the src="..." URL from the code Google
 * gives you, and set it as:
 *   NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL="https://www.google.com/maps/embed?pb=..."
 *
 * OPTION B (requires a Google Cloud API key with "Maps Embed API" enabled):
 *   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="your-key-here"
 * This builds the map from NEXT_PUBLIC_SHOP_ADDRESS (or
 * NEXT_PUBLIC_SHOP_LAT / NEXT_PUBLIC_SHOP_LNG), which are already used by
 * the Find Us section.
 *
 * If Option A's URL is set, it's used and Option B is ignored.
 */
export function ShopMap() {
  const embedUrl = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { address, latitude, longitude } = getShopInfo();

  let src: string | null = null;

  if (embedUrl) {
    src = embedUrl;
  } else if (apiKey && (address || (latitude && longitude))) {
    const query = latitude && longitude ? `${latitude},${longitude}` : address;
    src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(
      query
    )}`;
  }

  if (!src) return null;

  return (
    <div className="mt-4 overflow-hidden rounded-md border border-line">
      <iframe
        title="Shop location map"
        src={src}
        className="aspect-[4/3] w-full sm:aspect-video"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}