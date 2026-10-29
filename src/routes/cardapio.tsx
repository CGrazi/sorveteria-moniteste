import { createFileRoute, Link } from "@tanstack/react-router";
import { Snowflake } from "lucide-react";
import { flavors, categorias, brl } from "@/lib/flavors";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Moniteste Sorveteria" },
      { name: "description", content: "Sorvetes artesanais, milk shakes, taças e cardápio de inverno. Clique em um item para ver os detalhes e pedir." },
      { property: "og:title", content: "Cardápio — Moniteste Sorveteria" },
      { property: "og:description", content: "Sorvetes artesanais, milk shakes, taças e cardápio de inverno. Clique em um item para ver os detalhes e pedir." },
    ],
  }),
  component: Cardapio,
});

function Cardapio() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-5xl font-bold">Nosso cardápio</h1>
      <p className="mt-3 text-lg opacity-70">Clique em qualquer item para ver os detalhes, ingredientes e fazer seu pedido.</p>

      {categorias.map((cat) => {
        const itens = flavors.filter((f) => f.categoria === cat.id);
        const inverno = cat.id === "inverno";
        return (
          <section key={cat.id} id={cat.anchor} className={`scroll-mt-24 ${inverno ? "mt-12 rounded-[2rem] bg-mint p-6 md:p-10" : "mt-12"}`}>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-4xl font-bold">{cat.titulo}</h2>
              {inverno && (
                <span className="flex items-center gap-1 rounded-full bg-primary px-4 py-1 text-sm font-bold text-primary-foreground">
                  <Snowflake className="h-4 w-4" /> Edição limitada
                </span>
              )}
            </div>
            <p className="mt-2 opacity-70">{cat.subtitulo}</p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {itens.map((s) => (
                <Link key={s.slug} to="/sabores/$slug" params={{ slug: s.slug }} className={`${s.bg} group overflow-hidden rounded-3xl transition-transform hover:-translate-y-1`}>
                  <img src={s.img} alt={s.nome} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="flex items-end justify-between p-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{s.nome}</h3>
                      <p className="mt-1 opacity-80">{s.desc}</p>
                    </div>
                    <span className="font-display text-xl font-bold text-primary">{brl(s.preco)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
