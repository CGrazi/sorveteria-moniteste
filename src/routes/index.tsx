import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { ADDRESS, MAPS_LINK, MAPS_EMBED, whatsappLink, WHATSAPP_DISPLAY } from "@/lib/flavors";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moniteste — Sorveteria artesanal em Campinas" },
      { name: "description", content: "Sorvetes artesanais, milk shakes, taças e cardápio de inverno. Peça online ou pelo WhatsApp." },
      { property: "og:title", content: "Moniteste — Sorveteria artesanal" },
      { property: "og:description", content: "Sorvetes artesanais, milk shakes, taças e cardápio de inverno. Peça online ou pelo WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">Felicidade em cada <span className="text-primary">colherada</span></h1>
          <p className="mt-6 text-lg opacity-80">Sorvetes artesanais, milk shakes cremosos, taças caprichadas e delícias quentinhas de inverno — tudo feito aqui, todos os dias, com ingredientes frescos e muito carinho.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/cardapio" className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105">
              Ver cardápio <ArrowRight className="h-5 w-5" />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105">
              <MessageCircle className="h-5 w-5" /> Pedir no WhatsApp
            </a>
          </div>
        </div>
        <img src={hero} alt="Sorvetes artesanais da Moniteste" width={1600} height={1008} className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" />
      </section>

      <section id="contato" className="mx-auto max-w-6xl scroll-mt-24 px-6 pb-16">
        <div className="grid overflow-hidden rounded-[2rem] bg-primary text-primary-foreground md:grid-cols-2">
          <div className="p-10 md:p-14">
            <h2 className="font-display text-4xl font-bold">Venha nos visitar</h2>
            <p className="mt-6 flex gap-3 text-lg"><MapPin className="mt-1 h-5 w-5 shrink-0" />{ADDRESS}</p>
            <p className="mt-3 flex gap-3 text-lg"><Clock className="mt-1 h-5 w-5 shrink-0" />Todos os dias, das 12h às 22h</p>
            <p className="mt-3 flex gap-3 text-lg"><MessageCircle className="mt-1 h-5 w-5 shrink-0" />{WHATSAPP_DISPLAY}</p>
            <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-background px-6 py-3 font-bold text-foreground">Abrir no Google Maps</a>
          </div>
          <iframe title="Mapa Moniteste" src={MAPS_EMBED} loading="lazy" className="h-80 w-full border-0 md:h-full" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </section>
    </div>
  );
}
