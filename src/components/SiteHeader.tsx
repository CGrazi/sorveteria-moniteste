import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, User, LogOut, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useSession } from "@/lib/use-session";
import { supabase } from "@/integrations/supabase/client";

const menuItens = [
  { label: "Sabores", hash: "sabores" },
  { label: "Milk shakes", hash: "milkshakes" },
  { label: "Taças", hash: "tacas" },
  { label: "Inverno", hash: "inverno" },
  { label: "Visite-nos", hash: "contato" },
];

export function SiteHeader() {
  const { count } = useCart();
  const { user } = useSession();
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="font-display text-3xl font-bold text-primary" onClick={() => setAberto(false)}>Moniteste</Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-1 text-sm font-bold lg:flex">
          {menuItens.map((item) => (
            <Link key={item.hash} to="/" hash={item.hash} className="rounded-full px-4 py-2 transition-colors hover:bg-cream">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm font-bold">
          {user ? (
            <>
              <Link to="/pedidos" className="hidden rounded-full px-4 py-2 hover:bg-cream sm:inline">Meus pedidos</Link>
              <Link to="/perfil" aria-label="Meu perfil" className="rounded-full p-2 hover:bg-cream"><User className="h-5 w-5" /></Link>
              <button
                aria-label="Sair"
                onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/", replace: true }); }}
                className="rounded-full p-2 hover:bg-cream"
              ><LogOut className="h-5 w-5" /></button>
            </>
          ) : (
            <Link to="/auth" className="rounded-full px-4 py-2 hover:bg-cream">Entrar</Link>
          )}
          <Link to="/carrinho" className="relative flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-primary-foreground">
            <ShoppingCart className="h-5 w-5" />
            <span>{count}</span>
          </Link>
          <button
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={aberto}
            onClick={() => setAberto(!aberto)}
            className="rounded-full p-2 hover:bg-cream lg:hidden"
          >
            {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {aberto && (
        <nav aria-label="Menu principal" className="border-t border-border bg-background px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-1 text-base font-bold">
            {menuItens.map((item) => (
              <li key={item.hash}>
                <Link to="/" hash={item.hash} onClick={() => setAberto(false)} className="block rounded-2xl px-4 py-3 hover:bg-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
