export type OpeningHours = {
  day: string;
  hours: string;
};

/**
 * Central place for the shop's real-world identity: name, address, phone,
 * and hours. Used by the Find Us section, the WhatsApp button, and the
 * LocalBusiness structured data that helps Google understand the business.
 *
 * Keeping this consistent (same name/address/phone everywhere) also matters
 * for Google Business Profile — search engines trust listings more when the
 * details match across your website, Google Maps, and any directories.
 */
export function getShopInfo() {
  return {
    name: process.env.NEXT_PUBLIC_SHOP_NAME ?? "Auto Parts Shop",
    address: process.env.NEXT_PUBLIC_SHOP_ADDRESS ?? "",
    phoneDisplay: process.env.NEXT_PUBLIC_SHOP_PHONE_DISPLAY ?? "",
    whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, ""),
    hoursText: process.env.NEXT_PUBLIC_SHOP_HOURS ?? "Mon–Sat: 8:00am – 6:00pm",
    latitude: process.env.NEXT_PUBLIC_SHOP_LAT ? Number(process.env.NEXT_PUBLIC_SHOP_LAT) : null,
    longitude: process.env.NEXT_PUBLIC_SHOP_LNG ? Number(process.env.NEXT_PUBLIC_SHOP_LNG) : null,
  };
}

/** A Google Maps link that works whether or not we have exact coordinates. */
export function buildDirectionsLink(): string {
  const { address, latitude, longitude } = getShopInfo();

  if (latitude && longitude) {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  }

  if (address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  }

  return "https://www.google.com/maps";
}