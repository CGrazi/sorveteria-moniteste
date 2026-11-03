import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { recomendar, type Recomendacao } from "@/lib/recommend.functions";
import { getFlavor, brl } from "@/lib/flavors";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/recomendacoes")({
  head: () => ({
    meta: [
      { title: "Recomendações para você — Moniteste" },
      { name: "description", content: "Conte seus sabores preferidos e restrições e receba sugestões de sorvetes e sobremesas da Moniteste." },
      { property: "og:title", content: "Recomendações para você — Moniteste" },
      { property: "og:description", content: "Sugestões personalizadas de sorvetes e sobremesas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Page,
});

function Page() {
  const fn = useServerFn(recomendar);
  const { add } = useCart();
  const [gostos, setGostos] = useState("");
  const [restricoes, setRestricoes] = useState("");
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState<{ intro: string; itens: Recomendacao[]; error?: string } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      setRes(await fn({ data: { gostos, restricoes } }));
    } catch {
      setRes({ intro: "", itens: [], error: "Não foi possível gerar recomendações agora." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="flex items-center gap-3 font-display text-5xl font-bold"><Sparkles className="h-10 w-10 text-primary" /> Pra você</h1>
      <p className="mt-3 text-lg opacity-70">Conte do que você gosta e o que precisa evitar. A gente sugere as delícias ideais.</p>
      <form onSubmit={submit} className="mt-8 space-y-4 rounded-3xl bg-card p-6">
        <label className="block">
          <span className="font-bold">Sabores preferidos</span>
          <textarea value={gostos} onChange={(e) => setGostos(e.target.value)} maxLength={500} rows={2} placeholder="Ex.: chocolate, frutas cítricas, coisas bem doces..." className="mt-1 w-full rounded-2xl border border-border bg-background p-3" />
        </label>
        <label className="block">
          <span className="font-bold">Restrições alimentares</span>
          <textarea value={restricoes} onChange={(e) => setRestricoes(e.target.value)} maxLength={500} rows={2} placeholder="Ex.: sem lactose, vegano, alergia a castanhas..." className="mt-1 w-full rounded-2xl border border-border bg-background p-3" />
        </label>
        <button disabled={loading} className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60">
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />} {loading ? "Pensando..." : "Recomendar"}
        </button>
      </form>

      {res?.error && <p className="mt-6 rounded-2xl bg-destructive/10 p-4 text-destructive">{res.error}</p>}
      {res && !res.error && (
        <div className="mt-8">
          {res.intro && <p className="text-lg">{res.intro}</p>}
          <div className="mt-4 grid gap-4">
            {res.itens.map((r) => {
              const f = getFlavor(r.slug)!;
              return (
                <div key={r.slug} className={`${f.bg} flex items-center gap-4 rounded-3xl p-4`}>
                  <img src={f.img} alt={f.nome} className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <Link to="/sabores/$slug" params={{ slug: f.slug }} className="font-display text-xl font-bold hover:underline">{f.nome}</Link>
                    <p className="text-sm opacity-80">{r.motivo}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">{brl(f.preco)}</div>
                    <button onClick={() => { add({ slug: f.slug, nome: f.nome, preco: f.preco }); toast.success(`${f.nome} adicionado`); }} className="mt-1 rounded-full bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">Adicionar</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
