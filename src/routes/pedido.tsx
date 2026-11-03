import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { brl, whatsappLink } from "@/lib/flavors";

export const Route = createFileRoute("/pedido")({
  head: () => ({
    meta: [
      { title: "Pedir pelo WhatsApp — Moniteste" },
      { name: "description", content: "Revise os itens e quantidades e envie seu pedido da Moniteste direto pelo WhatsApp." },
      { property: "og:title", content: "Pedir pelo WhatsApp — Moniteste" },
      { property: "og:description", content: "Monte seu pedido e envie pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function montarMensagem(items: { nome: string; qtd: number; preco: number }[], total: number, nome: string, entrega: string, obs: string) {
  const linhas = items.map((i) => `• ${i.qtd}x ${i.nome} — ${brl(i.preco * i.qtd)}`);
  return [
    "Olá, Moniteste! Quero fazer um pedido:",
    "",
    ...linhas,
    "",
    `Total: ${brl(total)}`,
    ...(nome ? [`Nome: ${nome}`] : []),
    `Forma: ${entrega}`,
    ...(obs ? [`Obs.: ${obs}`] : []),
  ].join("\n");
}

function Page() {
  const { items, setQtd, total, clear } = useCart();
  const [nome, setNome] = useState("");
  const [entrega, setEntrega] = useState("Retirada na loja");
  const [obs, setObs] = useState("");

  if (!items.length)
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Seu pedido está vazio</h1>
        <Link to="/cardapio" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground">Escolher no cardápio</Link>
      </div>
    );

  const link = whatsappLink(montarMensagem(items, total, nome.trim(), entrega, obs.trim()));

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="font-display text-5xl font-bold">Pedir pelo WhatsApp</h1>
      <div className="mt-8 space-y-3">
        {items.map((i) => (
          <div key={i.slug} className="flex items-center gap-3 rounded-2xl bg-card p-4">
            <div className="flex-1">
              <div className="font-bold">{i.nome}</div>
              <div className="text-sm opacity-70">{brl(i.preco)} cada</div>
            </div>
            <button aria-label="Diminuir" onClick={() => setQtd(i.slug, i.qtd - 1)} className="rounded-full bg-secondary p-2"><Minus className="h-4 w-4" /></button>
            <span className="w-6 text-center font-bold">{i.qtd}</span>
            <button aria-label="Aumentar" onClick={() => setQtd(i.slug, i.qtd + 1)} className="rounded-full bg-secondary p-2"><Plus className="h-4 w-4" /></button>
            <button aria-label="Remover" onClick={() => setQtd(i.slug, 0)} className="p-2 opacity-60"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-right font-display text-2xl font-bold">Total: {brl(total)}</div>
      <div className="mt-6 space-y-3 rounded-3xl bg-card p-6">
        <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={80} placeholder="Seu nome" className="w-full rounded-2xl border border-border bg-background p-3" />
        <select value={entrega} onChange={(e) => setEntrega(e.target.value)} className="w-full rounded-2xl border border-border bg-background p-3">
          <option>Retirada na loja</option>
          <option>Entrega (informo o endereço no WhatsApp)</option>
        </select>
        <textarea value={obs} onChange={(e) => setObs(e.target.value)} maxLength={300} rows={2} placeholder="Observações (opcional)" className="w-full rounded-2xl border border-border bg-background p-3" />
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => setTimeout(clear, 500)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-4 font-bold text-primary-foreground">
        <MessageCircle className="h-5 w-5" /> Enviar pedido pelo WhatsApp
      </a>
    </div>
  );
}
