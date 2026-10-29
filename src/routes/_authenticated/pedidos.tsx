import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { brl } from "@/lib/flavors";

export const Route = createFileRoute("/_authenticated/pedidos")({
  head: () => ({
    meta: [
      { title: "Meus pedidos — Moniteste" },
      { name: "description", content: "Acompanhe seus pedidos na Moniteste." },
      { property: "og:title", content: "Meus pedidos — Moniteste" },
      { property: "og:description", content: "Acompanhe seus pedidos na Moniteste." },
    ],
  }),
  component: OrdersPage,
});

type Item = { nome: string; qtd: number };

function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  return (
    <div className="mx-auto max-w-3xl px-6 py-8">
      <h1 className="font-display text-4xl font-bold">Meus pedidos</h1>
      {isLoading ? <p className="mt-6 opacity-70">Carregando…</p> : !data?.length ? <p className="mt-6 opacity-70">Você ainda não fez pedidos.</p> : (
        <ul className="mt-6 space-y-4">
          {data.map((o) => (
            <li key={o.id} className="rounded-3xl bg-card p-6">
              <div className="flex justify-between">
                <span className="opacity-70">{new Date(o.created_at).toLocaleString("pt-BR")}</span>
                <span className="rounded-full bg-mint px-3 py-1 text-sm font-bold capitalize">{o.status}</span>
              </div>
              <p className="mt-3">{(o.items as Item[]).map((i) => `${i.qtd}x ${i.nome}`).join(", ")}</p>
              <div className="mt-3 flex justify-between font-bold">
                <span className="capitalize">{o.delivery_type} · {o.payment_method}</span>
                <span>{brl(Number(o.total))}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
