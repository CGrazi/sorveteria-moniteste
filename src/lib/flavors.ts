import morango from "@/assets/morango.jpg";
import pistache from "@/assets/pistache.jpg";
import baunilha from "@/assets/baunilha.jpg";
import chocolate from "@/assets/chocolate.jpg";
import limao from "@/assets/limao.jpg";
import doceDeLeite from "@/assets/doce-de-leite.jpg";
import milkshakeChocolate from "@/assets/milkshake-chocolate.jpg";
import milkshakeMorango from "@/assets/milkshake-morango.jpg";
import milkshakeOvomaltine from "@/assets/milkshake-ovomaltine.jpg";
import tacaMoniteste from "@/assets/taca-moniteste.jpg";
import tacaTropical from "@/assets/taca-tropical.jpg";
import tacaSupreme from "@/assets/taca-supreme.jpg";
import invernoChocolateQuente from "@/assets/inverno-chocolate-quente.jpg";
import invernoFondue from "@/assets/inverno-fondue.jpg";
import invernoWaffle from "@/assets/inverno-waffle.jpg";

export type Categoria = "sorvete" | "milkshake" | "taca" | "inverno";

export type Flavor = {
  slug: string;
  nome: string;
  desc: string;
  detalhes: string;
  ingredientes: string[];
  preco: number;
  img: string;
  bg: string;
  categoria: Categoria;
  unidade: string;
};

export const flavors: Flavor[] = [
  { slug: "morango", nome: "Morango", desc: "Morangos frescos e cremosos", detalhes: "Feito com morangos selecionados de pequenos produtores, batidos na hora para um sabor leve, frutado e muito cremoso.", ingredientes: ["Morango fresco", "Leite integral", "Creme de leite", "Açúcar"], preco: 14, img: morango, bg: "bg-pink", categoria: "sorvete", unidade: "pote 300ml" },
  { slug: "pistache", nome: "Pistache", desc: "Pistache torrado de verdade", detalhes: "Pasta de pistache 100% pura, torrada artesanalmente. Intenso, levemente salgado e irresistível.", ingredientes: ["Pistache torrado", "Leite integral", "Creme de leite", "Açúcar", "Flor de sal"], preco: 18, img: pistache, bg: "bg-mint", categoria: "sorvete", unidade: "pote 300ml" },
  { slug: "baunilha", nome: "Baunilha", desc: "Fava de baunilha natural", detalhes: "Clássico absoluto com favas de baunilha de verdade — você vê os pontinhos pretos em cada colherada.", ingredientes: ["Fava de baunilha", "Leite integral", "Creme de leite", "Gemas", "Açúcar"], preco: 14, img: baunilha, bg: "bg-cream", categoria: "sorvete", unidade: "pote 300ml" },
  { slug: "chocolate", nome: "Chocolate", desc: "Cacau 70% intenso", detalhes: "Chocolate meio amargo 70% cacau com raspas por cima. Para quem ama chocolate de verdade.", ingredientes: ["Chocolate 70%", "Cacau em pó", "Leite integral", "Açúcar"], preco: 15, img: chocolate, bg: "bg-pink", categoria: "sorvete", unidade: "pote 300ml" },
  { slug: "limao", nome: "Limão", desc: "Refrescante e azedinho", detalhes: "Sorbet sem leite, feito com suco de limão espremido na hora e um toque de hortelã. Vegano!", ingredientes: ["Limão", "Água", "Açúcar", "Hortelã"], preco: 12, img: limao, bg: "bg-mint", categoria: "sorvete", unidade: "pote 300ml" },
  { slug: "doce-de-leite", nome: "Doce de leite", desc: "Caseiro, cozido lentamente", detalhes: "Doce de leite cozido por horas no tacho, com calda extra por cima. Gostinho de casa de vó.", ingredientes: ["Doce de leite caseiro", "Leite integral", "Creme de leite"], preco: 15, img: doceDeLeite, bg: "bg-cream", categoria: "sorvete", unidade: "pote 300ml" },

  { slug: "milkshake-chocolate", nome: "Milk shake de chocolate", desc: "Cremoso, com chantilly e raspas", detalhes: "Sorvete de chocolate 70% batido com leite gelado até ficar bem cremoso, coroado com chantilly, calda e raspas de chocolate.", ingredientes: ["Sorvete de chocolate", "Leite gelado", "Chantilly", "Calda de chocolate", "Raspas de chocolate"], preco: 19, img: milkshakeChocolate, bg: "bg-pink", categoria: "milkshake", unidade: "copo 500ml" },
  { slug: "milkshake-morango", nome: "Milk shake de morango", desc: "Com morangos frescos batidos", detalhes: "Sorvete de morango batido com leite e morangos frescos, finalizado com chantilly e um morango inteiro por cima.", ingredientes: ["Sorvete de morango", "Leite gelado", "Morango fresco", "Chantilly"], preco: 19, img: milkshakeMorango, bg: "bg-cream", categoria: "milkshake", unidade: "copo 500ml" },
  { slug: "milkshake-ovomaltine", nome: "Milk shake de Ovomaltine", desc: "Crocante e irresistível", detalhes: "Batido com sorvete de baunilha e muito Ovomaltine, com chantilly e uma camada generosa de crocante por cima.", ingredientes: ["Sorvete de baunilha", "Leite gelado", "Ovomaltine", "Chantilly", "Crocante de Ovomaltine"], preco: 21, img: milkshakeOvomaltine, bg: "bg-mint", categoria: "milkshake", unidade: "copo 500ml" },

  { slug: "taca-moniteste", nome: "Taça Moniteste", desc: "3 bolas, calda quente e castanhas", detalhes: "A nossa clássica: três bolas de sorvete (chocolate, baunilha e morango), calda quente de chocolate, castanhas picadas, chantilly e cereja.", ingredientes: ["Sorvete de chocolate", "Sorvete de baunilha", "Sorvete de morango", "Calda quente de chocolate", "Castanhas", "Chantilly", "Cereja"], preco: 28, img: tacaMoniteste, bg: "bg-cream", categoria: "taca", unidade: "taça" },
  { slug: "taca-tropical", nome: "Taça Tropical", desc: "Manga, maracujá e kiwi", detalhes: "Bolas de sorvete de manga e maracujá com cubos de manga fresca, kiwi, polpa de maracujá e hortelã. Refrescância pura.", ingredientes: ["Sorvete de manga", "Sorvete de maracujá", "Manga fresca", "Kiwi", "Polpa de maracujá", "Hortelã"], preco: 26, img: tacaTropical, bg: "bg-mint", categoria: "taca", unidade: "taça" },
  { slug: "taca-supreme", nome: "Taça Supreme", desc: "Brownie quente e amêndoas tostadas", detalhes: "Pedaços de brownie morno, bolas de sorvete de baunilha, calda quente de chocolate, chantilly e lâminas de amêndoas tostadas.", ingredientes: ["Brownie quente", "Sorvete de baunilha", "Calda quente de chocolate", "Chantilly", "Amêndoas tostadas"], preco: 29, img: tacaSupreme, bg: "bg-pink", categoria: "taca", unidade: "taça" },

  { slug: "inverno-chocolate-quente", nome: "Chocolate quente cremoso", desc: "Com marshmallows e canela", detalhes: "Chocolate quente bem cremoso, feito com chocolate 70% derretido no leite, servido com marshmallows e uma pitada de canela.", ingredientes: ["Chocolate 70%", "Leite integral", "Creme de leite", "Marshmallows", "Canela"], preco: 16, img: invernoChocolateQuente, bg: "bg-cream", categoria: "inverno", unidade: "caneca 300ml" },
  { slug: "inverno-fondue", nome: "Fondue de chocolate", desc: "Com frutas e sorvete para mergulhar", detalhes: "Panelinha de chocolate derretido na hora, acompanhada de morangos, banana e bolinhas de sorvete para mergulhar. Perfeito para dividir.", ingredientes: ["Chocolate derretido", "Morangos", "Banana", "Bolinhas de sorvete variadas"], preco: 45, img: invernoFondue, bg: "bg-pink", categoria: "inverno", unidade: "serve 2 pessoas" },
  { slug: "inverno-waffle", nome: "Waffle quente com sorvete", desc: "Quentinho, com calda e canela", detalhes: "Waffle dourado feito na hora, servido quentinho com uma bola de sorvete de baunilha, calda de chocolate e canela polvilhada.", ingredientes: ["Waffle artesanal", "Sorvete de baunilha", "Calda de chocolate", "Canela"], preco: 24, img: invernoWaffle, bg: "bg-mint", categoria: "inverno", unidade: "prato individual" },
];

export const categorias: { id: Categoria; titulo: string; subtitulo: string; anchor: string }[] = [
  { id: "sorvete", titulo: "Nossos sabores", subtitulo: "Clique em um sabor para ver os detalhes.", anchor: "sabores" },
  { id: "milkshake", titulo: "Milk shakes", subtitulo: "Batidos na hora, bem cremosos.", anchor: "milkshakes" },
  { id: "taca", titulo: "Taças", subtitulo: "Montadas com capricho para saborear sem pressa.", anchor: "tacas" },
  { id: "inverno", titulo: "Cardápio de inverno", subtitulo: "Delícias quentinhas para os dias frios.", anchor: "inverno" },
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
