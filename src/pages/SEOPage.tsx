import React from 'react';
import { motion } from "motion/react";
import { ArrowLeft, Gamepad2, Zap, Trophy, Smartphone, Globe } from "lucide-react";
import { SEO } from "../components/SEO";

interface SEOPageProps {
  title: string;
  description: string;
  h1: string;
  content: React.ReactNode;
  keyword: string;
}

export const SEOPage = ({ title, description, h1, content, keyword }: SEOPageProps) => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-neon-purple/30">
      <SEO title={title} description={description} />
      
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/5 blur-[150px] rounded-full" />
      </div>

      <nav className="relative z-10 p-6 border-b border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-[10px]"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Início
          </button>
          <div className="flex flex-col items-end">
            <span className="font-display font-black text-xl tracking-tighter italic leading-none">TRYHARD</span>
            <span className="font-display font-bold text-[8px] tracking-[0.4em] text-neon-cyan leading-none">ACADEMY</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 py-20 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-7xl font-display font-black italic tracking-tighter mb-8 uppercase leading-[0.9]">
            {h1}
          </h1>
          
          <div className="prose prose-invert max-w-none text-gray-400 font-medium leading-relaxed space-y-6">
            {content}
          </div>

          <div className="mt-16 p-8 bg-white/5 border border-white/10 rounded-[32px] text-center">
            <h2 className="text-2xl font-black italic uppercase mb-4">Pronto para o Desafio?</h2>
            <p className="text-gray-400 mb-8">Junte-se a milhares de jogadores e prove que você é o melhor em {keyword}.</p>
            <button 
              onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
              className="inline-flex items-center gap-3 px-10 py-5 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              <Gamepad2 className="w-6 h-6" /> JOGAR AGORA GRÁTIS
            </button>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 py-12 border-t border-white/5 text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
        &copy; 2026 Tryhard Academy • Todos os direitos reservados
      </footer>
    </div>
  );
};
