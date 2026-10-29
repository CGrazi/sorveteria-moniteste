import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useSession } from "@/lib/use-session";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const { count } = useCart();
  const { user } = useSession();
  const navigate = useNavigate();
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
      <Link to="/" className="font-display text-3xl font-bold text-primary">Moniteste</Link>
      <nav className="flex items-center gap-2 text-sm font-bold">
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
      </nav>
    </header>
  );
}
