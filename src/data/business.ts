export interface BusinessInfo {
  brandName: string;
  domain: string;
  baseUrl: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  email: string;
  city: string;
  district: string;
  address: string;
  workingHours: string;
}

export const BUSINESS_INFO: BusinessInfo = {
  brandName: "Katre Cam",
  domain: "katrecam.com",
  baseUrl: "https://katrecam.com",
  phoneDisplay: "0533 164 33 19",
  phoneHref: "tel:+905331643319",
  whatsappNumber: "905331643319",
  whatsappDefaultMessage:
    "Merhaba Katre Cam, Bodrum bölgesi için keşif ve fiyat bilgisi almak istiyorum.",
  email: "info@katrecam.com",
  city: "Muğla",
  district: "Bodrum",
  address: "Turgutreis Sanayi Sitesi, Bodrum / Muğla",
  workingHours: "Pzt - Cmt: 08:30 - 18:30",
};

export function buildWhatsAppUrl(customContext?: string): string {
  const message = customContext
    ? `${BUSINESS_INFO.whatsappDefaultMessage} (Konu: ${customContext})`
    : BUSINESS_INFO.whatsappDefaultMessage;
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}
