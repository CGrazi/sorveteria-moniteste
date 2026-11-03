import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { flavors } from "./flavors";

type Input = { gostos: string; restricoes: string };
export type Recomendacao = { slug: string; motivo: string };

export const recomendar = createServerFn({ method: "POST" })
  .inputValidator((d: Input) => ({
    gostos: String(d?.gostos ?? "").slice(0, 500),
    restricoes: String(d?.restricoes ?? "").slice(0, 500),
  }))
  .handler(async ({ data }): Promise<{ itens: Recomendacao[]; intro: string; error?: string }> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { itens: [], intro: "", error: "Recomendações indisponíveis no momento." };
    if (!data.gostos.trim() && !data.restricoes.trim())
      return { itens: [], intro: "", error: "Conte um pouco do que você gosta." };

    const cardapio = flavors
      .map((f) => `- slug: ${f.slug} | ${f.nome} (${f.categoria}) | ${f.desc} | ingredientes: ${f.ingredientes.join(", ")}`)
      .join("\n");

    const openai = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    });

    try {
      const result = streamText({
        model: openai.responses("openai/gpt-6-astra"),
        maxRetries: 0,
        providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", store: false } },
        system:
          "Você é o atendente da sorveteria Moniteste. Recomende de 2 a 4 itens APENAS do cardápio abaixo, respeitando rigorosamente as restrições alimentares (ex.: sem lactose/vegano exclui leite, creme, chantilly, gemas; alergia a nozes exclui pistache). Se nada for seguro, retorne lista vazia e explique. Responda somente em JSON: {\"intro\": string curta, \"itens\": [{\"slug\": string, \"motivo\": string curta}]}.\n\nCardápio:\n" +
          cardapio,
        prompt: `Gostos: ${data.gostos || "(não informado)"}\nRestrições: ${data.restricoes || "nenhuma"}`,
      });
      const text = await result.text;
      const json = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
      const itens = (json.itens ?? []).filter((i: Recomendacao) => flavors.some((f) => f.slug === i.slug));
      return { intro: String(json.intro ?? ""), itens };
    } catch (e: any) {
      console.error("recomendar", e);
      const status = e?.statusCode ?? e?.status;
      if (status === 429) return { itens: [], intro: "", error: "Muitos pedidos agora, tente em instantes." };
      if (status === 402) return { itens: [], intro: "", error: "Recomendações temporariamente indisponíveis." };
      return { itens: [], intro: "", error: "Não foi possível gerar recomendações agora." };
    }
  });
