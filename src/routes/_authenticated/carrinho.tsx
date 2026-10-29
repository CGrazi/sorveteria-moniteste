import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Minus, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/lib/cart";
import { brl, getFlavor } from "@/lib/flavors";

export const Route = createFileRoute("/_authenticated/carrinho")({
  head: () => ({
    meta: [
      { title: "Carrinho — Moniteste" },
      { name: "description", content: "Revise e finalize seu pedido na Moniteste." },
      { property: "og:title", content: "Carrinho — Moniteste" },
      { property: "og:description", content: "Revise e finalize seu pedido na Moniteste." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQtd, total, clear } = useCart();
  const navigate = useNavigate();
  const [delivery, setDelivery] = useState<"retirada" | "entrega">("retirada");
  const [payment, setPayment] = useState("dinheiro");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
      if (data) { setName(data.full_name ?? ""); setPhone(data.phone ?? ""); setAddress(data.address ?? ""); }
    })();
  }, []);

  const checkout = async () => {
    if (!items.length) return;
    if (!name.trim() || !phone.trim()) { toast.error("Informe nome e telefone"); return; }
    if (delivery === "entrega" && !address.trim()) { toast.error("Informe o endereço de entrega"); return; }
    setBusy(true);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) { setBusy(false); return; }
    const { error } = await supabase.from("orders").insert({
      user_id: u.user.id,
      items: items,
      total,
      delivery_type: delivery,
      payment_method: payment,
      customer_name: name.trim().slice(0, 100),
      phone: phone.trim().slice(0, 30),
      address: delivery === "entrega" ? address.trim().slice(0, 300) : null,
      notes: notes.trim().slice(0, 500) || null,
    });
    setBusy(false);
    if (error) { toast.error("Não foi possível salvar o pedido"); return; }
    clear();
    toast.success("Pedido recebido! Pagamento na " + (delivery === "entrega" ? "entrega." : "retirada."));
    navigate({ to: "/pedidos" });
  };

  if (!items.length)
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-display text-4xl font-bold">Seu carrinho está vazio</h1>
        <Link to="/" hash="sabores" className="mt-6 inline-block rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground">Escolher sabores</Link>
      </div>
    );

  const input = "w-full rounded-2xl border bg-background px-4 py-3";
  const pill = (active: boolean) => `rounded-full px-5 py-2 font-bold ${active ? "bg-primary text-primary-foreground" : "bg-cream"}`;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-8 md:grid-cols-[1fr_380px]">
      <div>
        <h1 className="font-display text-4xl font-bold">Seu carrinho</h1>
        <ul className="mt-6 space-y-4">
          {items.map((i) => {
            const f = getFlavor(i.slug);
            return (
              <li key={i.slug} className="flex items-center gap-4 rounded-3xl bg-card p-4">
                {f && <img src={f.img} alt={i.nome} className="h-20 w-20 rounded-2xl object-cover" />}
                <div className="flex-1">
                  <p className="font-display text-xl font-bold">{i.nome}</p>
                  <p className="opacity-70">{brl(i.preco)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button aria-label="Diminuir" onClick={() => setQtd(i.slug, i.qtd - 1)} className="rounded-full bg-cream p-2"><Minus className="h-4 w-4" /></button>
                  <span className="w-6 text-center font-bold">{i.qtd}</span>
                  <button aria-label="Aumentar" onClick={() => setQtd(i.slug, i.qtd + 1)} className="rounded-full bg-cream p-2"><Plus className="h-4 w-4" /></button>
                  <button aria-label="Remover" onClick={() => setQtd(i.slug, 0)} className="ml-2 p-2 text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="h-fit space-y-5 rounded-3xl bg-card p-6">
        <div className="flex gap-2">
          <button onClick={() => setDelivery("retirada")} className={pill(delivery === "retirada")}>Retirar na loja</button>
          <button onClick={() => setDelivery("entrega")} className={pill(delivery === "entrega")}>Entrega</button>
        </div>
        <input className={input} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
        <input className={input} placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {delivery === "entrega" && <input className={input} placeholder="Endereço de entrega" value={address} onChange={(e) => setAddress(e.target.value)} />}
        <div>
          <p className="mb-2 font-bold">Pagamento na {delivery === "entrega" ? "entrega" : "retirada"}</p>
          <select className={input} value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="dinheiro">Dinheiro</option>
            <option value="pix">Pix</option>
            <option value="cartao">Cartão</option>
          </select>
        </div>
        <textarea className={input} placeholder="Observações (opcional)" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
        <div className="flex justify-between font-display text-2xl font-bold"><span>Total</span><span>{brl(total)}</span></div>
        <button disabled={busy} onClick={checkout} className="w-full rounded-full bg-primary py-4 font-bold text-primary-foreground disabled:opacity-60">Confirmar pedido</button>
      </aside>
    </div>
  );
}
