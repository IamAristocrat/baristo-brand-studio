export const WHATSAPP_NUMBER = "919894595035";

export function whatsappUrl(message = "Hello Baristo, I'd like to know more about your coffee.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const firstPourWhatsApp = whatsappUrl("Hello Baristo, I'd like to join the First Pour Circle. Please share launch updates and availability.");
export const inquiryWhatsApp = whatsappUrl("Hello Baristo, I have a question about your coffee. Please help me choose a roast.");
export function reserveWhatsApp(roast: string) {
  return whatsappUrl(`Hello Baristo, I'd like to reserve ${roast}, 340 g, at ₹2,579 per pack.\nQuantity: 1\nPlease confirm availability, delivery and the final payable amount before payment.`);
}
