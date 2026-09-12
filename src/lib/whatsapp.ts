/**
 * Builds a wa.me link that opens WhatsApp with a pre-filled message
 * mentioning the specific product the customer is asking about.
 */
export function buildWhatsAppLink(productName: string): string {
  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const number = rawNumber.replace(/[^\d]/g, ""); // digits only, country code included

  const message = `I want to buy this: ${productName}`;
  const encodedMessage = encodeURIComponent(message);

  if (!number) {
    // Fall back to wa.me without a number so the link still opens WhatsApp's
    // "choose a contact" flow instead of throwing, in case the owner hasn't
    // configured NEXT_PUBLIC_WHATSAPP_NUMBER yet.
    return `https://wa.me/?text=${encodedMessage}`;
  }

  return `https://wa.me/${number}?text=${encodedMessage}`;
}
