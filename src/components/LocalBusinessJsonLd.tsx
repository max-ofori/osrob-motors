import { getShopInfo } from "@/lib/shop";

/**
 * Structured data (schema.org/AutoPartsStore) tells Google exactly what
 * this business is, where it is, and when it's open. It doesn't replace a
 * Google Business Profile (that's what gets you onto Google Maps), but it
 * reinforces the same facts and can help pages qualify for richer results.
 */
export function LocalBusinessJsonLd() {
  const { name, address, whatsappNumber } = getShopInfo();

  if (!address) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
    },
    ...(whatsappNumber ? { telephone: `+${whatsappNumber}` } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}