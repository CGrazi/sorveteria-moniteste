import { Link } from "@tanstack/react-router";
import { MapPin, Clock, MessageCircle } from "lucide-react";
import { ADDRESS, MAPS_LINK, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/flavors";

export function SiteFooter() {
  return (
    <footer className="mt-8 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-3xl font-bold">Moniteste</p>
          <p className="mt-3 max-w-xs opacity-90">Sorvetes artesanais, milk shakes, taças e delícias quentinhas de inverno — feitos todos os dias com muito carinho.</p>
        </div>

        <nav aria-label="Cardápio">
          <p className="font-display text-xl font-bold">Cardápio</p>
          <ul className="mt-4 space-y-2 font-bold">
            <li><Link to="/cardapio" hash="sabores" className="opacity-90 transition-opacity hover:opacity-100 hover:underline">Nossos sabores</Link></li>
            <li><Link to="/cardapio" hash="milkshakes" className="opacity-90 transition-opacity hover:opacity-100 hover:underline">Milk shakes</Link></li>
            <li><Link to="/cardapio" hash="tacas" className="opacity-90 transition-opacity hover:opacity-100 hover:underline">Taças</Link></li>
            <li><Link to="/cardapio" hash="inverno" className="opacity-90 transition-opacity hover:opacity-100 hover:underline">Cardápio de inverno</Link></li>
          </ul>
        </nav>

        <div>
          <p className="font-display text-xl font-bold">Contato</p>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3"><MapPin className="mt-1 h-5 w-5 shrink-0" /><span>{ADDRESS}</span></li>
            <li className="flex gap-3"><Clock className="mt-1 h-5 w-5 shrink-0" /><span>Todos os dias, das 12h às 22h</span></li>
            <li className="flex gap-3"><MessageCircle className="mt-1 h-5 w-5 shrink-0" /><span>{WHATSAPP_DISPLAY}</span></li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="rounded-full bg-background px-5 py-2 text-sm font-bold text-foreground">Como chegar</a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="rounded-full bg-whatsapp px-5 py-2 text-sm font-bold text-primary-foreground">Pedir no WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/20 py-6 text-center text-sm opacity-80">
        © 2026 Moniteste Sorveteria — Feito com amor em Campinas
      </div>
    </footer>
  );
}
