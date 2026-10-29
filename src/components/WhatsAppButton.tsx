import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/flavors";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-whatsapp px-5 py-4 font-bold text-primary-foreground shadow-2xl transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden sm:inline">Pedir no WhatsApp</span>
    </a>
  );
}
