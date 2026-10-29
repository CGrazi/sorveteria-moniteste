import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/lib/use-session";
import "@lovable.dev/cloud-auth-js/styles.css";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Entrar — Moniteste" },
      { name: "description", content: "Entre ou crie sua conta para fazer pedidos na Moniteste." },
      { property: "og:title", content: "Entrar — Moniteste" },
      { property: "og:description", content: "Entre ou crie sua conta para fazer pedidos na Moniteste." },
    ],
  }),
  component: AuthPage,
});

const schema = z.object({
  email: z.string().trim().email("E-mail inválido").max(255),
  password: z.string().min(6, "Senha com no mínimo 6 caracteres").max(72),
  name: z.string().trim().max(100).optional(),
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate({ to: "/carrinho" }); }, [user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password, name: mode === "signup" ? name : undefined });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
      });
      if (error) toast.error(error.message);
      else toast.success("Conta criada! Confira seu e-mail para confirmar.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error("E-mail ou senha incorretos");
    }
    setBusy(false);
  };

  const social = async (provider: "google" | "lovable") => {
    const r = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin });
    if (r.error) toast.error("Não foi possível entrar");
  };

  const input = "w-full rounded-2xl border bg-background px-4 py-3";
  return (
    <div className="mx-auto max-w-md px-6 py-10">
      <h1 className="font-display text-4xl font-bold">{mode === "login" ? "Entrar" : "Criar conta"}</h1>
      <p className="mt-2 opacity-70">Faça login para finalizar seus pedidos online.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        {mode === "signup" && <input className={input} placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />}
        <input className={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className={input} type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={busy} className="w-full rounded-full bg-primary py-3 font-bold text-primary-foreground disabled:opacity-60">
          {mode === "login" ? "Entrar" : "Criar conta"}
        </button>
      </form>
      <div className="my-6 text-center text-sm opacity-60">ou</div>
      <div className="space-y-3">
        <button onClick={() => social("google")} className="w-full rounded-full border bg-background py-3 font-bold">Continuar com Google</button>
        <button type="button" onClick={() => social("lovable")} className="lovable-auth-button w-full">Continue with Lovable</button>
      </div>
      <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-6 w-full text-center font-bold text-primary">
        {mode === "login" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
      </button>
    </div>
  );
}
