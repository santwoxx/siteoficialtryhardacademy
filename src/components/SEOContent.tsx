import { motion } from "motion/react";
import { CheckCircle2, Zap, Trophy, Gamepad2 } from "lucide-react";

export const SEOContent = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-black/20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-display font-black italic tracking-tighter mb-12 uppercase leading-none text-center">
          VOCÊ É UM <span className="text-neon-cyan">TRYHARD</span>?
        </h2>
        
        <div className="prose prose-invert max-w-none space-y-8 text-gray-400 font-medium leading-relaxed">
          <p>
            A <strong>Tryhard Academy</strong> não é apenas um jogo. É um teste de sobrevivência mental. 
            Inspirado na intensidade das arenas competitivas, aqui sua inteligência é a única arma que importa. 
            Ou você é rápido, ou você é eliminado.
          </p>

          <div className="grid md:grid-cols-2 gap-8 my-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-white font-black italic uppercase tracking-tight mb-4 flex items-center gap-2">
                <Zap className="text-neon-cyan w-5 h-5" /> SISTEMA DE ATAQUE
              </h3>
              <p className="text-sm">
                Não há espaço para hesitação. Resolva cálculos em milissegundos para disparar contra seus oponentes. 
                Errou? Você fica vulnerável. Acertou? Você domina.
              </p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-white font-black italic uppercase tracking-tight mb-4 flex items-center gap-2">
                <Trophy className="text-neon-purple w-5 h-5" /> DOMÍNIO MENTAL
              </h3>
              <p className="text-sm">
                Isso não é sobre "aprender". É sobre esmagar recordes e humilhar a concorrência com sua velocidade. 
                Apenas os 1% mais rápidos sobrevivem na arena.
              </p>
            </div>
          </div>

          <h3 className="text-2xl text-white font-black italic uppercase tracking-tight">VANTAGENS COMPETITIVAS</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-neon-cyan w-5 h-5 mt-1 shrink-0" />
              <span><strong>Foco de Predador:</strong> Treine seu cérebro para agir sob pressão extrema.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-neon-cyan w-5 h-5 mt-1 shrink-0" />
              <span><strong>Arena Global:</strong> Humilhe jogadores de todo o país em tempo real.</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-neon-cyan w-5 h-5 mt-1 shrink-0" />
              <span><strong>Acesso Instantâneo:</strong> Sem downloads. Sem desculpas. Apenas ação pura.</span>
            </li>
          </ul>

          <div className="mt-16 bg-[#121212] rounded-[40px] p-10 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] rounded-full" />
            <div className="relative z-10 text-center space-y-8">
              <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">RECLAME SEU LUGAR NO TOPO</h3>
              <p className="text-gray-400 font-medium italic max-w-xl mx-auto">
                A elite não espera. Entre no clã, conquiste skins raras e prove que você é o melhor.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button 
                  onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-6 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(34,211,238,0.4)] group"
                >
                  <Gamepad2 className="w-6 h-6 group-hover:rotate-12 transition-transform" /> ENTRAR NA ARENA
                </button>
                <button 
                  onClick={() => window.open('https://chat.whatsapp.com/EqsLhul3a2n8gD7Gtbo4bw?mode=gi_t', '_blank')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-10 py-6 bg-[#25D366] text-white font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(37,211,102,0.3)]"
                >
                  <Zap className="w-6 h-6" /> RECLAMAR SKINS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
