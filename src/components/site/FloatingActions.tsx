import { MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href="https://wa.me/910000000000"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="w-14 h-14 grid place-items-center rounded-full bg-green-500 text-white shadow-glow hover:scale-110 transition-smooth animate-pulse-glow"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
      <a
        href="tel:+910000000000"
        aria-label="Call"
        className="w-14 h-14 grid place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:scale-110 transition-smooth"
      >
        <Phone className="w-6 h-6" />
      </a>
    </div>
  );
}
