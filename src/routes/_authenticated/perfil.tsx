import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({
    meta: [
      { title: "Meu perfil — Moniteste" },
      { name: "description", content: "Seus dados para pedidos na Moniteste." },
      { property: "og:title", content: "Meu perfil — Moniteste" },
      { property: "og:description", content: "Seus dados para pedidos na Moniteste." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [uid, setUid] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setUid(u.user.id);
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
      if (data) { setName(data.full_name ?? ""); setPhone(data.phone ?? ""); setAddress(data.address ?? ""); }
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uid) return;
    const { error } = await supabase.from("profiles").upsert({
      id: uid, full_name: name.trim().slice(0, 100), phone: phone.trim().slice(0, 30), address: address.trim().slice(0, 300), updated_at: new Date().toISOString(),
    });
    if (error) toast.error("Erro ao salvar"); else toast.success("Dados salvos!");
  };

  const input = "w-full rounded-2xl border bg-background px-4 py-3";
  return (
    <form onSubmit={save} className="mx-auto max-w-md space-y-4 px-6 py-8">
      <h1 className="font-display text-4xl font-bold">Meu perfil</h1>
      <input className={input} placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
      <input className={input} placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input className={input} placeholder="Endereço de entrega" value={address} onChange={(e) => setAddress(e.target.value)} />
      <button className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground">Salvar</button>
    </form>
  );
}
