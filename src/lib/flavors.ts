import morango from "@/assets/morango.jpg";
import pistache from "@/assets/pistache.jpg";
import baunilha from "@/assets/baunilha.jpg";
import chocolate from "@/assets/chocolate.jpg";
import limao from "@/assets/limao.jpg";
import doceDeLeite from "@/assets/doce-de-leite.jpg";

export type Flavor = {
  slug: string;
  nome: string;
  desc: string;
  detalhes: string;
  ingredientes: string[];
  preco: number;
  img: string;
  bg: string;
};

export const flavors: Flavor[] = [
  { slug: "morango", nome: "Morango", desc: "Morangos frescos e cremosos", detalhes: "Feito com morangos selecionados de pequenos produtores, batidos na hora para um sabor leve, frutado e muito cremoso.", ingredientes: ["Morango fresco", "Leite integral", "Creme de leite", "Açúcar"], preco: 14, img: morango, bg: "bg-pink" },
  { slug: "pistache", nome: "Pistache", desc: "Pistache torrado de verdade", detalhes: "Pasta de pistache 100% pura, torrada artesanalmente. Intenso, levemente salgado e irresistível.", ingredientes: ["Pistache torrado", "Leite integral", "Creme de leite", "Açúcar", "Flor de sal"], preco: 18, img: pistache, bg: "bg-mint" },
  { slug: "baunilha", nome: "Baunilha", desc: "Fava de baunilha natural", detalhes: "Clássico absoluto com favas de baunilha de verdade — você vê os pontinhos pretos em cada colherada.", ingredientes: ["Fava de baunilha", "Leite integral", "Creme de leite", "Gemas", "Açúcar"], preco: 14, img: baunilha, bg: "bg-cream" },
  { slug: "chocolate", nome: "Chocolate", desc: "Cacau 70% intenso", detalhes: "Chocolate meio amargo 70% cacau com raspas por cima. Para quem ama chocolate de verdade.", ingredientes: ["Chocolate 70%", "Cacau em pó", "Leite integral", "Açúcar"], preco: 15, img: chocolate, bg: "bg-pink" },
  { slug: "limao", nome: "Limão", desc: "Refrescante e azedinho", detalhes: "Sorbet sem leite, feito com suco de limão espremido na hora e um toque de hortelã. Vegano!", ingredientes: ["Limão", "Água", "Açúcar", "Hortelã"], preco: 12, img: limao, bg: "bg-mint" },
  { slug: "doce-de-leite", nome: "Doce de leite", desc: "Caseiro, cozido lentamente", detalhes: "Doce de leite cozido por horas no tacho, com calda extra por cima. Gostinho de casa de vó.", ingredientes: ["Doce de leite caseiro", "Leite integral", "Creme de leite"], preco: 15, img: doceDeLeite, bg: "bg-cream" },
];

export const getFlavor = (slug: string) => flavors.find((f) => f.slug === slug);

export const WHATSAPP_NUMBER = "5514999999999";
export const WHATSAPP_DISPLAY = "(14) 99999-9999";
export const ADDRESS = "R. das Flores, 100 - Vila Aeroporto, Campinas - SP, 13056-084";
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;
export const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
export const whatsappLink = (msg = "Olá! Gostaria de fazer um pedido.") =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

export const brl = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
