import { GoogleGenAI } from "@google/genai";

let aiInstance: any = null;

const getAIInstance = () => {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY_MISSING");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
};

export const chatWithGemini = async (messages: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const ai = getAIInstance();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages,
      config: {
        systemInstruction: `Você é o "Tryhard Bot", o assistente virtual oficial da Tryhard Academy. 
        Seu objetivo principal é ser profissional, empolgante e PERSUASIVO para convencer alunos a comprarem o acesso Premium do jogo.
        
        Sobre o Jogo:
        - Nome: Tryhard Academy.
        - Gênero: Arena de Matemática Competitiva.
        - Mecânica: Resolva contas rápidas para atacar oponentes em duelos X1 em tempo real.
        - Benefícios: Melhora o raciocínio lógico, velocidade mental e é extremamente divertido.
        - Preço: Menos de R$ 0,50 por dia (Assinatura Premium).
        - Promoção Atual: 20% de desconto para novos cadastrados (via pop-up de lead).
        
        Diretrizes de Personalidade:
        1. Profissionalismo: Use uma linguagem clara, mas com gírias de "gamer" (ex: pro-player, clutch, meta, rankup) para gerar conexão.
        2. Foco em Benefícios: Não fale apenas de "fazer contas", fale de "dominar a arena" e "ter o cérebro mais rápido do servidor".
        3. Urgência: Mencione que as vagas para o grupo de "Fundadores" são limitadas.
        4. Call to Action: Sempre incentive o usuário a clicar no botão de "JOGAR AGORA" ou "OBTER ACESSO PREMIUM".
        
        Responda de forma concisa e organizada, usando emojis para manter o tom gamer/moderno.`,
      },
    });

    return response.text;
  } catch (error: any) {
    if (error.message === "GEMINI_API_KEY_MISSING") {
      console.warn("Gemini API Key não configurada no Vercel.");
      return "Opa! Meu sistema de IA está em manutenção no momento (API Key não configurada). Mas você ainda pode aproveitar o jogo e o desconto de 20%! 🚀";
    }
    console.error("Gemini API Error:", error);
    return "Desculpe, tive um pequeno glitch no meu processador. Pode repetir? 🤖";
  }
};
