import { createFileRoute, Link } from "@tanstack/react-router";
import { Snowflake } from "lucide-react";
import { flavors, categorias, brl } from "@/lib/flavors";
import { useCart } from "@/lib/cart";
import { Minus, Plus, MessageCircle, Sparkles } from "lucide-react";

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

function Qtd({ slug, nome, preco }: { slug: string; nome: string; preco: number }) {
  const { items, add, setQtd } = useCart();
  const q = items.find((i) => i.slug === slug)?.qtd ?? 0;
  if (!q) return <button onClick={() => add({ slug, nome, preco })} className="w-full rounded-full bg-primary py-2 font-bold text-primary-foreground">Adicionar</button>;
  return (
    <div className="flex items-center justify-between rounded-full bg-background/70 p-1">
      <button aria-label={`Diminuir ${nome}`} onClick={() => setQtd(slug, q - 1)} className="rounded-full bg-primary p-2 text-primary-foreground"><Minus className="h-4 w-4" /></button>
      <span className="font-bold">{q}</span>
      <button aria-label={`Aumentar ${nome}`} onClick={() => setQtd(slug, q + 1)} className="rounded-full bg-primary p-2 text-primary-foreground"><Plus className="h-4 w-4" /></button>
    </div>
  );
}

function Cardapio() {
  const { count, total } = useCart();
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-5xl font-bold">Nosso cardápio</h1>
      <p className="mt-3 text-lg opacity-70">Escolha os itens e quantidades e envie seu pedido pelo WhatsApp.</p>
      <Link to="/recomendacoes" className="mt-4 inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-2 font-bold"><Sparkles className="h-4 w-4 text-primary" /> Não sabe o que pedir? Receba sugestões</Link>

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
                <div key={s.slug} className={`${s.bg} overflow-hidden rounded-3xl`}>
                <Link to="/sabores/$slug" params={{ slug: s.slug }} className="group block">
                  <img src={s.img} alt={s.nome} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="flex items-end justify-between p-6">
                    <div>
                      <h3 className="font-display text-2xl font-bold">{s.nome}</h3>
                      <p className="mt-1 opacity-80">{s.desc}</p>
                    </div>
                    <span className="font-display text-xl font-bold text-primary">{brl(s.preco)}</span>
                  </div>
                </Link>
                <div className="px-6 pb-6"><Qtd slug={s.slug} nome={s.nome} preco={s.preco} /></div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
      {count > 0 && (
        <Link to="/pedido" className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-bold text-primary-foreground shadow-lg">
          <MessageCircle className="h-5 w-5" /> Revisar pedido ({count}) · {brl(total)}
        </Link>
      )}
    </div>
  );
}
