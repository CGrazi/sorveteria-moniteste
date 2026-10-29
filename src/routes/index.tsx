import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Moniteste — Sorveteria artesanal" },
      { name: "description", content: "Sorvetes artesanais feitos todos os dias com ingredientes frescos na Moniteste." },
      { property: "og:title", content: "Moniteste — Sorveteria artesanal" },
      { property: "og:description", content: "Sorvetes artesanais feitos todos os dias com ingredientes frescos." },
    ],
  }),
  component: Index,
});

const sabores = [
  { nome: "Morango", desc: "Morangos frescos e cremosos", bg: "bg-pink" },
  { nome: "Pistache", desc: "Pistache torrado de verdade", bg: "bg-mint" },
  { nome: "Baunilha", desc: "Fava de baunilha natural", bg: "bg-cream" },
  { nome: "Chocolate", desc: "Cacau 70% intenso", bg: "bg-pink" },
  { nome: "Limão", desc: "Refrescante e azedinho", bg: "bg-mint" },
  { nome: "Doce de leite", desc: "Caseiro, cozido lentamente", bg: "bg-cream" },
];

function Index() {
  return (
    <div className="min-h-screen font-sans">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-3xl font-bold text-primary">Moniteste</span>
        <a href="#contato" className="rounded-full bg-primary px-5 py-2 font-bold text-primary-foreground">Visite-nos</a>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-10 md:grid-cols-2">
        <div>
          <h1 className="font-display text-5xl font-bold leading-tight md:text-7xl">Felicidade em cada <span className="text-primary">colherada</span></h1>
          <p className="mt-6 text-lg opacity-80">Sorvetes artesanais feitos todos os dias, com ingredientes frescos e muito carinho.</p>
          <a href="#sabores" className="mt-8 inline-block rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground transition-transform hover:scale-105">Ver sabores</a>
        </div>
        <img src={hero} alt="Sorvetes artesanais da Moniteste" className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl" />
      </section>

      <section id="sabores" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-4xl font-bold">Nossos sabores</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sabores.map((s) => (
            <div key={s.nome} className={`${s.bg} rounded-3xl p-8 transition-transform hover:-translate-y-1`}>
              <h3 className="font-display text-2xl font-bold">{s.nome}</h3>
              <p className="mt-2 opacity-80">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contato" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-[2rem] bg-primary p-10 text-primary-foreground md:p-14">
          <h2 className="font-display text-4xl font-bold">Venha nos visitar</h2>
          <p className="mt-4 text-lg">Rua dos Sorvetes, 123 — Centro</p>
          <p className="mt-1 text-lg">Todos os dias, das 12h às 22h</p>
        </div>
      </section>

      <footer className="py-8 text-center text-sm opacity-70">© 2026 Moniteste Sorveteria</footer>
    </div>
  );
}
