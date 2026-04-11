/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  Gamepad2, 
  Crown, 
  Trophy, 
  Zap, 
  Target, 
  CheckCircle2, 
  MessageSquare,
  Copy,
  Check,
  Upload,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  Monitor,
  Tablet,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  MessageCircle,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  User,
  Lock
} from "lucide-react";
import { useState, useEffect, FormEvent } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ChatBot } from "./components/ChatBot";

const PIX_KEY = "73991422872";
const WHATSAPP_NUMBER = "5573991422872";

export default function App() {
  const [copied, setCopied] = useState(false);
  const [showProofStep, setShowProofStep] = useState(false);
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', email: '', whatsapp: '' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const images = [
    "https://i.ibb.co/MxGYBZ7G/aaaaaaaaaaaaaa.png",
    "https://i.ibb.co/BHzgqddy/img1.png",
    "https://i.ibb.co/Cp8s5mCg/image.png",
    "https://i.ibb.co/WND5Zg9T/image.png",
    "https://i.ibb.co/Z69jQhZ2/image.png"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    // Show cookie banner if not accepted
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }

    // Show lead modal after 10 seconds if not submitted
    const leadSubmittedLocal = localStorage.getItem('leadSubmitted');
    if (!leadSubmittedLocal) {
      const modalTimer = setTimeout(() => {
        setShowLeadModal(true);
      }, 10000);
      return () => {
        clearInterval(timer);
        clearTimeout(modalTimer);
      };
    }

    return () => clearInterval(timer);
  }, [images.length]);

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);
    try {
      await addDoc(collection(db, "leads"), {
        ...leadData,
        createdAt: serverTimestamp(),
        source: 'landing_page_popup'
      });
      setLeadSubmitted(true);
      localStorage.setItem('leadSubmitted', 'true');
      setTimeout(() => setShowLeadModal(false), 2000);
    } catch (error) {
      console.error("Error saving lead:", error);
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowCookieBanner(false);
  };

  const copyPix = () => {
    navigator.clipboard.writeText(PIX_KEY);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFinalStep = () => {
    const message = encodeURIComponent("Olá! Acabei de realizar o pagamento da minha assinatura Acesso Premium na Tryhard Academy. Segue o comprovante em anexo para liberação imediata! 🚀👑");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#050505] overflow-x-hidden selection:bg-neon-purple/30 text-white font-sans selection:text-white">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="scanline" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-purple/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <span className="font-display font-black text-2xl tracking-tighter italic leading-none text-white">TRYHARD</span>
              <span className="font-display font-bold text-[10px] tracking-[0.4em] text-neon-cyan leading-none mt-1">ACADEMY</span>
            </motion.div>
            
            <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white transition-colors text-white border-b-2 border-neon-cyan pb-1">
                Visão geral
              </button>
              <button onClick={() => scrollToSection('founder')} className="hover:text-white transition-colors">
                Planos
              </button>
              <button onClick={() => scrollToSection('features')} className="hover:text-white transition-colors">
                Recursos
              </button>
              <button onClick={() => scrollToSection('payment')} className="hover:text-white transition-colors">
                Assinar
              </button>
              <button 
                onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                className="bg-neon-cyan text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
              >
                COMEÇAR GRÁTIS
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg border border-white/10"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#121212] border-b border-white/5 overflow-hidden"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {['Visão geral', 'Complementos', 'Perguntas frequentes', 'Conquistas'].map((item, i) => (
                  <a key={i} href="#" className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                ))}
                <button 
                  onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                  className="w-full py-5 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-2xl text-sm shadow-lg active:scale-95 transition-transform"
                >
                  JOGAR AGORA (GRÁTIS)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-[1600px] mx-auto relative z-10">
        {/* Header Info */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-display font-black italic tracking-tighter mb-4 uppercase leading-[0.9]">TRYHARD ACADEMY</h1>
            <p className="text-neon-cyan font-black italic uppercase tracking-widest text-sm mb-6">Onde o QI alto encontra a mira perfeita</p>
            <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-gray-400">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Zap key={i} className={`w-4 h-4 ${i < 5 ? 'text-neon-cyan fill-neon-cyan' : 'text-gray-700'}`} />
                ))}
                <span className="ml-2 text-white">5.0 (2.4k+ avaliações)</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-neon-purple" />
                <span>+2.000 Jogadores Ativos</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,211,238,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
              className="px-10 py-6 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-2xl text-base shadow-[0_0_40px_rgba(34,211,238,0.2)] transition-all flex items-center justify-center gap-3"
            >
              <Gamepad2 className="w-6 h-6" /> JOGAR AGORA
            </motion.button>
            <p className="text-[10px] text-center font-bold text-gray-500 uppercase tracking-widest">Grátis para sempre • Sem download</p>
          </div>
        </div>

        {/* Quick Clarity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {[
            { emoji: "⚡", text: "Resolva contas para atacar" },
            { emoji: "🏆", text: "Derrote jogadores reais" },
            { emoji: "🎮", text: "Jogue grátis todos os dias" }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-4">
              <span className="text-2xl">{item.emoji}</span>
              <span className="font-black italic uppercase tracking-tight text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Left Column: Media */}
          <div className="space-y-6 overflow-hidden">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImageIndex}
                  src={images[currentImageIndex]} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  alt="Tryhard Academy Gameplay" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Slider Controls */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-neon-cyan hover:text-black transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="absolute bottom-8 left-8">
                <div className="inline-flex items-center gap-3 bg-neon-purple px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest italic shadow-lg">
                  <Crown className="w-4 h-4" /> Temporada de Fundadores
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="absolute bottom-4 right-8 flex gap-2">
                {images.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentImageIndex ? 'w-8 bg-neon-cyan' : 'w-2 bg-white/30'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {images.map((src, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`flex-shrink-0 w-32 md:w-40 aspect-video rounded-xl overflow-hidden border-2 transition-all ${i === currentImageIndex ? 'border-neon-cyan scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                >
                  <img src={src} alt={`Screenshot ${i}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>

            {/* About Section */}
            <div className="pt-12 space-y-20">
              <div className="max-w-3xl">
                <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-6 text-white leading-[0.9]">DESTRUA SEUS INIMIGOS COM O PODER DA MENTE</h2>
                <p className="text-xl text-gray-300 leading-relaxed font-medium italic">
                  Fique mais rápido em matemática enquanto aniquila oponentes na Arena. Tryhard Academy transforma o aprendizado em uma arma letal. Domine os números ou seja dominado.
                </p>
              </div>

              <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-neon-cyan transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Gamepad2 className="w-24 h-24 text-neon-cyan" />
                  </div>
                  <Gamepad2 className="w-12 h-12 text-neon-cyan mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-black italic uppercase mb-4">DOMÍNIO MULTIPLAYER X1</h4>
                  <p className="text-gray-400 text-base leading-relaxed font-medium">Humilhe seus amigos em duelos de inteligência pura. O cálculo mais rápido vence a batalha. Sem sorte, apenas habilidade.</p>
                </div>
                <div className="bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-neon-purple transition-all group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Zap className="w-24 h-24 text-neon-purple" />
                  </div>
                  <Zap className="w-12 h-12 text-neon-purple mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-2xl font-black italic uppercase mb-4">EVOLUÇÃO CEREBRAL ACELERADA</h4>
                  <p className="text-gray-400 text-base leading-relaxed font-medium">Nossa arena força seu cérebro a processar informações 5x mais rápido. Aprenda matemática avançada enquanto se diverte no nível máximo.</p>
                </div>
              </div>

              {/* Social Proof Section */}
              <div className="bg-gradient-to-br from-neon-purple/20 to-transparent p-12 rounded-[40px] border border-white/10">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-2">O QUE OS PRO-PLAYERS DIZEM</h3>
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => <Zap key={i} className="w-5 h-5 text-fortnite-yellow fill-fortnite-yellow" />)}
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { name: "Lucas 'Bolt'", text: "Muito viciante! Minha nota na escola subiu e minha mira no CS também.", role: "Top 10 Global" },
                    { name: "Ana Silva", text: "Finalmente um jogo que não é perda de tempo. Aprendo e me divirto.", role: "Estudante de Engenharia" },
                    { name: "Marcos Pro", text: "O modo X1 é insano. A adrenalina de resolver a conta e atirar é única.", role: "Streamer" }
                  ].map((item, i) => (
                    <div key={i} className="bg-black/40 p-6 rounded-2xl border border-white/5 italic">
                      <p className="text-gray-300 text-sm mb-4">"{item.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10" />
                        <div>
                          <p className="text-[10px] font-black uppercase text-white">{item.name}</p>
                          <p className="text-[8px] font-bold text-neon-cyan uppercase">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">VANTAGENS DO ASSINANTE</h3>
                <div className="grid gap-6">
                  {[
                    { title: "PROGRESSÃO SEM LIMITES", desc: "Acesso total a todos os módulos de treinamento, desafios avançados e atualizações semanais de conteúdo." },
                    { title: "CUSTOMIZAÇÃO EXCLUSIVA", desc: "Desbloqueie skins, emotes e efeitos visuais únicos que demonstram seu status de elite na comunidade." },
                    { title: "COMUNIDADE COMPETITIVA", desc: "Participe de torneios exclusivos com premiações e garanta seu lugar entre os maiores gênios da Arena." }
                  ].map((benefit, i) => (
                    <div key={i} className="flex gap-6 items-start p-6 bg-gradient-to-r from-white/5 to-transparent rounded-2xl border-l-4 border-neon-cyan">
                      <div className="w-8 h-8 rounded-full bg-neon-cyan/20 flex items-center justify-center flex-shrink-0 font-black text-neon-cyan">{i + 1}</div>
                      <div>
                        <h5 className="font-black italic uppercase text-white mb-1">{benefit.title}</h5>
                        <p className="text-gray-400 text-sm font-medium">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter">VISÃO GERAL DA ARENA</h3>
                <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                  <p className="text-white font-black italic text-xl">DOMINE OS NÚMEROS, CONQUISTE O MUNDO</p>
                  <p>
                    Em Tryhard Academy, o conhecimento é sua armadura e a lógica é sua espada. Explore mapas dinâmicos em 4K onde cada decisão conta. O sistema de combate exige que você resolva equações em milissegundos para ativar habilidades especiais, criando uma experiência de adrenalina pura e aprendizado real.
                  </p>
                  <div className="relative rounded-3xl overflow-hidden aspect-[21/9] border border-white/10">
                    <img src="https://i.ibb.co/MxGYBZ7G/aaaaaaaaaaaaaa.png" className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-black italic uppercase tracking-[0.5em] text-white/20">EXPERIÊNCIA 4K NATIVA</span>
                    </div>
                  </div>
                  <p className="text-white font-black italic text-xl">COMPETIÇÃO DE ALTO NÍVEL</p>
                  <p>
                    Seja no modo cooperativo ou no brutal X1, a Tryhard Academy oferece o ambiente perfeito para quem busca excelência. Não é apenas sobre quem é mais rápido, mas sobre quem pensa melhor sob pressão.
                  </p>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                      className="inline-flex items-center justify-center gap-3 bg-neon-cyan text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm group hover:bg-white transition-all shadow-lg"
                    >
                      JOGAR AGORA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                    <button 
                      onClick={() => scrollToSection('payment')}
                      className="inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all"
                    >
                      OBTER ACESSO PREMIUM
                    </button>
                  </div>
                </div>
              </div>

              {/* Referral Section */}
              <div className="bg-[#121212] p-10 rounded-[40px] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 blur-[100px] rounded-full" />
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-neon-cyan/20 rounded-2xl flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-neon-cyan" />
                    </div>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter">CONVIDE E GANHE</h3>
                  </div>
                  <p className="text-gray-400 font-medium mb-8 max-w-xl">
                    Convide 15 amigos e desbloqueie <span className="text-white font-black">30 DIAS DE ACESSO PREMIUM</span> totalmente grátis. Espalhe a palavra e domine a arena com seu squad.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-gray-500">Seu Progresso</span>
                      <span className="text-neon-cyan">0 / 15 Amigos</span>
                    </div>
                    <div className="h-4 bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                      <div className="h-full w-[5%] bg-neon-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText('https://tryhardacademyoficial.vercel.app/?ref=user');
                        alert('Link de convite copiado!');
                      }}
                      className="flex-1 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl text-xs hover:bg-neon-cyan transition-all flex items-center justify-center gap-3"
                    >
                      <Copy className="w-4 h-4" /> Copiar link de convite
                    </button>
                    <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-xl text-xs hover:bg-white/10 transition-all">
                      Ver ranking de convites
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Purchase Card */}
          <div className="space-y-6">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 shadow-2xl">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex flex-col items-center">
                    <span className="font-display font-black text-4xl tracking-tighter italic leading-none text-white">TRYHARD</span>
                    <span className="font-display font-bold text-[12px] tracking-[0.4em] text-neon-cyan leading-none mt-1">ACADEMY</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-fortnite-yellow rounded-xl flex items-center justify-center font-black text-black text-xl">14</div>
                  <div>
                    <p className="text-xs font-black uppercase">14 anos</p>
                    <p className="text-[10px] text-gray-500 font-bold">Linguagem Imprópria, Competição</p>
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <div className="flex items-center justify-between">
                    <span className="bg-white/10 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">Assinatura Mensal</span>
                    <span className="text-[10px] font-black text-neon-purple animate-pulse">VAGAS LIMITADAS</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-neon-cyan text-black px-2 py-1 rounded text-xs font-black">-68% OFF</span>
                    <span className="text-gray-500 line-through font-bold">R$ 47,00</span>
                    <span className="text-3xl font-black italic text-white">R$ 15,00</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-neon-cyan font-bold uppercase tracking-wider">Menos de R$ 0,50 por dia</p>
                    <p className="text-[9px] text-gray-500 font-bold uppercase">Cancele quando quiser • Acesso imediato</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection('payment')}
                    className="w-full py-5 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-xl shadow-[0_0_30px_rgba(34,211,238,0.3)] hover:bg-white transition-colors"
                  >
                    Compre agora
                  </motion.button>
                  <button className="w-full py-5 bg-white/5 border border-white/10 font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                    <Zap className="w-4 h-4" /> Presentear
                  </button>
                  <button className="w-full py-5 bg-white/5 border border-white/10 font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-3">
                    <Crown className="w-4 h-4" /> Lista de desejos
                  </button>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500 uppercase tracking-wider">Desenvolvedor</span>
                    <span className="text-white">Tryhard Studios</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500 uppercase tracking-wider">Editora</span>
                    <span className="text-white">Tryhard Academy</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500 uppercase tracking-wider">Lançamento</span>
                    <span className="text-white">07/04/26</span>
                  </div>
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500 uppercase tracking-wider">Plataforma</span>
                    <div className="flex gap-2">
                      <Monitor className="w-4 h-4" />
                      <Smartphone className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/10 transition-colors">Compartilhar</button>
                <button 
                  onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                  className="flex-1 py-4 bg-neon-cyan text-black border border-neon-cyan rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:border-white transition-all hover:scale-105 active:scale-95"
                >
                  JOGAR AGORA
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Editions & Add-ons Section */}
      <section id="founder" className="py-32 px-6 relative bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">EDIÇÕES E COMPLEMENTOS</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Escolha como você quer entrar na arena</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Standard Edition */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 group"
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src="https://i.ibb.co/Cp8s5mCg/image.png" alt="Standard Edition" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Jogo Base</span>
                  <h3 className="text-2xl font-black italic uppercase mt-1">Edição Recruta</h3>
                </div>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">Acesso básico à Arena Matemática e aos modos de treino fundamentais.</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xl font-black italic">GRÁTIS</span>
                  <button 
                    onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
                    className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-colors"
                  >
                    JOGAR AGORA
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Founder Edition - Featured */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden border-2 border-neon-purple shadow-[0_0_50px_rgba(168,85,247,0.15)] group relative"
            >
              <div className="absolute top-4 right-4 z-20 bg-neon-purple text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                Mais Popular
              </div>
              <div className="aspect-[16/9] relative overflow-hidden">
                <img src="https://i.ibb.co/j92HWQgd/img3.png" alt="Founder Edition" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-neon-purple">Assinatura Mensal</span>
                  <h3 className="text-2xl font-black italic uppercase mt-1">Acesso Premium</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Acesso Total (30 dias)",
                    "Modos Multiplayer & X1",
                    "Aprenda Matemática Jogando",
                    "Skins e Recompensas Exclusivas"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs font-bold text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-neon-purple" /> {item}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 line-through font-bold">R$ 47,00</span>
                    <span className="text-2xl font-black italic text-white">R$ 15,00</span>
                  </div>
                  <button 
                    onClick={() => scrollToSection('payment')}
                    className="px-8 py-4 bg-neon-purple text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:bg-white hover:text-black transition-all"
                  >
                    COMPRAR AGORA
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Elite Edition */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-[#1a1a1a] rounded-2xl overflow-hidden border border-white/5 group opacity-60"
            >
              <div className="aspect-[16/9] relative overflow-hidden grayscale">
                <img src="https://i.ibb.co/WND5Zg9T/image.png" alt="Elite Edition" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-black/80 px-6 py-2 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">Em Breve</div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Edição Premium</span>
                  <h3 className="text-2xl font-black italic uppercase mt-1">Edição Elite</h3>
                </div>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">A experiência definitiva com torneios oficiais e coaching de pro-players.</p>
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xl font-black italic text-gray-600">---</span>
                  <button disabled className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-600 cursor-not-allowed">
                    BLOQUEADO
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section id="payment" className="py-32 px-6 relative bg-[#121212]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1a1a1a] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-[1fr_350px]">
              {/* Left: Payment Info */}
              <div className="p-12 space-y-12">
                <AnimatePresence mode="wait">
                  {!showProofStep ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-10"
                    >
                      <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">FINALIZAR COMPRA</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Passo 1: Pagamento Instantâneo via PIX</p>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 text-center space-y-6">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Escaneie o QR Code PIX</p>
                          <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                            <img 
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${PIX_KEY}`} 
                              alt="QR Code PIX" 
                              className="w-40 h-40"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="text-[10px] font-black tracking-tighter text-gray-400 uppercase tracking-widest">Chave: {PIX_KEY}</p>
                            <button 
                              onClick={copyPix}
                              className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all ${copied ? 'bg-green-500 text-white' : 'bg-neon-cyan text-black hover:bg-white'}`}
                            >
                              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              {copied ? 'Copiado!' : 'Copiar Chave'}
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { icon: Smartphone, label: "Pague R$15" },
                            { icon: CheckCircle2, label: "Tire Print" },
                            { icon: MessageCircle, label: "Envie Aqui" }
                          ].map((item, i) => (
                            <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 text-center space-y-2">
                              <item.icon className="w-5 h-5 mx-auto text-gray-500" />
                              <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => setShowProofStep(true)}
                        className="w-full py-6 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-xl hover:bg-white transition-colors shadow-lg"
                      >
                        Já realizei o pagamento
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-10"
                    >
                      <button 
                        onClick={() => setShowProofStep(false)}
                        className="text-gray-500 hover:text-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors"
                      >
                        <ArrowRight className="rotate-180 w-4 h-4" /> Voltar
                      </button>

                      <div>
                        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">ENVIAR COMPROVANTE</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Passo 2: Verificação de Segurança</p>
                      </div>

                      <label className="block cursor-pointer group">
                        <div className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center gap-4 transition-all ${receiptUploaded ? 'border-green-500 bg-green-500/5' : 'border-white/10 hover:border-neon-cyan bg-white/5'}`}>
                          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${receiptUploaded ? 'bg-green-500 text-white' : 'bg-white/10 text-gray-500 group-hover:text-neon-cyan'}`}>
                            {receiptUploaded ? <Check className="w-8 h-8" /> : <Upload className="w-8 h-8" />}
                          </div>
                          <div className="text-center">
                            <p className="text-sm font-black uppercase tracking-widest">{receiptUploaded ? 'Comprovante Anexado' : 'Anexar Imagem'}</p>
                            <p className="text-[10px] text-gray-500 font-bold mt-1">Clique para selecionar o arquivo</p>
                          </div>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files?.[0] && setReceiptUploaded(true)} />
                      </label>

                      <button 
                        onClick={handleFinalStep}
                        disabled={!receiptUploaded}
                        className="w-full py-6 bg-neon-purple text-white font-black uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Finalizar Verificação
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: Summary */}
              <div className="bg-[#121212] p-12 border-l border-white/5 space-y-8">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Resumo do Pedido</h3>
                
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <img src="https://i.ibb.co/PsYXjZZ3/27fdbc2b-c0c6-4556-91ab-3446af0a5e02.png" alt="Founder Package" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest mb-1">Acesso Premium</p>
                    <p className="text-[10px] text-gray-500 font-bold">Plano Mensal (30 dias)</p>
                  </div>
                </div>

                <div className="space-y-4 pt-8 border-t border-white/5">
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-gray-500 uppercase tracking-widest">Preço Original</span>
                    <span className="text-gray-400 line-through">R$ 47,00</span>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold">
                    <span className="text-gray-500 uppercase tracking-widest">Desconto Fundador</span>
                    <span className="text-neon-cyan">- R$ 32,00</span>
                  </div>
                  <div className="flex justify-between items-end pt-4">
                    <span className="text-xs font-black uppercase tracking-widest">Total</span>
                    <span className="text-3xl font-black italic text-white">R$ 15,00</span>
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <div className="flex items-center gap-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 text-neon-cyan" />
                    Transação Criptografada
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                    <Zap className="w-4 h-4 text-neon-purple" />
                    Ativação em até 24h
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-black text-2xl tracking-tighter italic leading-none text-white">TRYHARD</span>
            <span className="font-display font-bold text-[10px] tracking-[0.4em] text-neon-cyan leading-none mt-1">ACADEMY</span>
            <button 
              onClick={() => window.open('https://tryhardacademyoficial.vercel.app', '_blank')}
              className="mt-6 px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-neon-cyan hover:text-black transition-all"
            >
              JOGAR GRATUITAMENTE
            </button>
            <p className="text-[10px] text-gray-600 font-bold mt-6 uppercase tracking-widest">© 2026 Tryhard Studios. Todos os direitos reservados.</p>
          </div>

          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Suporte</a>
          </div>

          <div className="flex gap-6">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5">
                <Icon className="w-5 h-5 text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {showLeadModal && !leadSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLeadModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 rounded-[32px] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button onClick={() => setShowLeadModal(false)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-neon-cyan/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-neon-cyan" />
                </div>
                <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white">PRESENTE DE FUNDADOR</h3>
                <p className="text-gray-400 text-sm font-medium mt-2">Deixe seu contato e receba um cupom exclusivo de <span className="text-neon-cyan font-bold">20% EXTRA</span> na sua primeira assinatura!</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="text" 
                      placeholder="Seu nome"
                      value={leadData.name}
                      onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-neon-cyan outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="email" 
                      placeholder="seu@email.com"
                      value={leadData.email}
                      onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-neon-cyan outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-2">WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input 
                      required
                      type="tel" 
                      placeholder="(00) 00000-0000"
                      value={leadData.whatsapp}
                      onChange={(e) => setLeadData({...leadData, whatsapp: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:border-neon-cyan outline-none transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmittingLead}
                  className="w-full py-5 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-xl shadow-lg hover:bg-white transition-all disabled:opacity-50 mt-4"
                >
                  {isSubmittingLead ? 'Enviando...' : 'RESGATAR MEU DESCONTO'}
                </button>
                
                <p className="text-[9px] text-center text-gray-600 font-bold uppercase tracking-widest">
                  Prometemos não enviar spam. Seus dados estão seguros.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 z-[110] md:left-auto md:max-w-md"
          >
            <div className="bg-[#1a1a1a]/95 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-white">Privacidade e Segurança</h4>
                  <p className="text-[10px] text-gray-400 font-medium mt-1 leading-relaxed">
                    Usamos cookies e tecnologias similares para melhorar sua experiência, analisar o tráfego e oferecer conteúdos personalizados. Ao continuar, você concorda com nossa política de privacidade.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={acceptCookies}
                  className="flex-1 py-3 bg-neon-cyan text-black font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-white transition-all"
                >
                  Aceitar Tudo
                </button>
                <button 
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-3 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-white/10 transition-all"
                >
                  Recusar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {leadSubmitted && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[120] bg-green-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="w-5 h-5" /> Cupom enviado para seu e-mail!
          </motion.div>
        )}
      </AnimatePresence>

      <ChatBot />
    </div>
  );
}
