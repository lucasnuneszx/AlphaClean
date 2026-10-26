export const WHATSAPP_NUMBER = "5511999990000";

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
