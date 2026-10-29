import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { getFlavor, brl, whatsappLink } from "@/lib/flavors";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/sabores/$slug")({
  loader: ({ params }) => {
    const flavor = getFlavor(params.slug);
    if (!flavor) throw notFound();
    return { flavor };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.flavor.nome} — Moniteste` },
          { name: "description", content: loaderData.flavor.detalhes },
          { property: "og:title", content: `${loaderData.flavor.nome} — Moniteste` },
          { property: "og:description", content: loaderData.flavor.detalhes },
        ]
      : [{ title: "Sabor não encontrado — Moniteste" }, { name: "robots", content: "noindex" }],
  }),
  component: FlavorPage,
});

function FlavorPage() {
  const { flavor } = Route.useLoaderData();
  const { add } = useCart();
  const [qtd, setQtd] = useState(1);
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <Link to="/cardapio" className="inline-flex items-center gap-2 font-bold opacity-70 hover:opacity-100"><ArrowLeft className="h-4 w-4" /> Voltar ao cardápio</Link>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <img src={flavor.img} alt={flavor.nome} width={1024} height={1024} className={`${flavor.bg} aspect-square w-full rounded-[2rem] object-cover shadow-xl`} />
        <div>
          <h1 className="font-display text-5xl font-bold">{flavor.nome}</h1>
          <p className="mt-2 font-display text-3xl font-bold text-primary">{brl(flavor.preco)} <span className="text-base font-normal opacity-70">/ {flavor.unidade}</span></p>
          <p className="mt-6 text-lg opacity-80">{flavor.detalhes}</p>
          <h2 className="mt-8 font-display text-xl font-bold">Ingredientes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {flavor.ingredientes.map((i) => <li key={i} className={`${flavor.bg} rounded-full px-4 py-1`}>{i}</li>)}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 rounded-full bg-cream px-3 py-2">
              <button aria-label="Diminuir" onClick={() => setQtd(Math.max(1, qtd - 1))} className="rounded-full p-1"><Minus className="h-4 w-4" /></button>
              <span className="w-6 text-center font-bold">{qtd}</span>
              <button aria-label="Aumentar" onClick={() => setQtd(qtd + 1)} className="rounded-full p-1"><Plus className="h-4 w-4" /></button>
            </div>
            <button
              onClick={() => { add({ slug: flavor.slug, nome: flavor.nome, preco: flavor.preco }, qtd); toast.success(`${qtd}x ${flavor.nome} no carrinho`); }}
              className="rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105"
            >Adicionar ao carrinho</button>
          </div>
          <a href={whatsappLink(`Olá! Quero pedir ${qtd}x ${flavor.nome}.`)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block font-bold text-whatsapp underline">Ou peça pelo WhatsApp</a>
        </div>
      </div>
    </div>
  );
}
