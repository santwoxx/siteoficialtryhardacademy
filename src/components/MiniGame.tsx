import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Target, Trophy, RotateCcw, Gamepad2, Crown } from 'lucide-react';

interface MiniGameProps {
  onPlayFullGame: () => void;
}

export const MiniGame: React.FC<MiniGameProps> = ({ onPlayFullGame }) => {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [problem, setProblem] = useState({ a: 0, b: 0, op: '+', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<'hit' | 'miss' | null>(null);
  const [enemiesKilled, setEnemiesKilled] = useState(0);
  const [unlockedSkin, setUnlockedSkin] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const generateProblem = () => {
    const ops = ['+', '-', '*'];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;

    if (op === '+') {
      a = Math.floor(Math.random() * 20) + 1;
      b = Math.floor(Math.random() * 20) + 1;
      answer = a + b;
    } else if (op === '-') {
      a = Math.floor(Math.random() * 30) + 10;
      b = Math.floor(Math.random() * a);
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 10) + 1;
      b = Math.floor(Math.random() * 10) + 1;
      answer = a * b;
    }

    setProblem({ a, b, op, answer });
    setUserAnswer('');
  };

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setEnemiesKilled(0);
    setUnlockedSkin(null);
    generateProblem();
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      setGameState('gameover');
      if (score > 5) setUnlockedSkin('Neon Striker');
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(userAnswer) === problem.answer) {
      setScore(score + 1);
      setEnemiesKilled(prev => prev + 1);
      setFeedback('hit');
      generateProblem();
      // Add time bonus
      setTimeLeft(prev => Math.min(prev + 2, 30));
    } else {
      setFeedback('miss');
      // Shake effect or penalty
      setTimeLeft(prev => Math.max(prev - 3, 0));
    }
    setTimeout(() => setFeedback(null), 500);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-[16/10] bg-[#0a0a0a] rounded-[32px] border-2 border-white/10 shadow-2xl flex flex-col overflow-visible">
      {/* Background Elements (Simulating Game) - Moved here to keep them clipped if needed, but we'll use a wrapper */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full animate-ping" />
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-neon-purple rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-4">
          <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
            <Target className="w-4 h-4 text-neon-cyan" />
            <span className="font-black text-white">{enemiesKilled} ELIMINAÇÕES</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className={`px-6 py-2 rounded-xl font-black text-xl transition-colors ${timeLeft < 10 ? 'bg-red-500 text-white animate-pulse' : 'bg-neon-cyan text-black'}`}>
            {timeLeft}s
          </div>
        </div>
      </div>

      {/* Game Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <AnimatePresence mode="wait">
          {gameState === 'idle' && (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center z-10 flex flex-col items-center"
            >
              <h3 className="text-5xl md:text-7xl font-black italic uppercase mb-8 leading-[0.9] tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)] skew-x-[-4deg] px-4">
                VOCÊ <br /> <span className="text-neon-cyan">DURARIA?</span>
              </h3>
              <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] mb-12">⚠️ VOCÊ NÃO VAI DURAR 10 SEGUNDOS</p>
              <button 
                onClick={onPlayFullGame}
                className="group relative px-16 py-10 bg-neon-cyan text-black font-black uppercase tracking-[0.2em] rounded-[2rem] text-2xl shadow-[0_0_60px_rgba(34,211,238,0.4)] hover:scale-110 hover:shadow-[0_0_100px_rgba(34,211,238,0.6)] transition-all active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <div className="relative flex items-center gap-4">
                  <Zap className="w-8 h-8 fill-black" /> ACEITAR O RISCO
                </div>
              </button>
            </motion.div>
          )}

          {gameState === 'playing' && (
            <motion.div 
              key="playing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center gap-8"
            >
              {/* Problem Display */}
              <div className="text-center">
                <div className="text-7xl md:text-9xl font-black italic tracking-tighter text-white mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  {problem.a} <span className="text-neon-cyan">{problem.op === '*' ? '×' : problem.op}</span> {problem.b}
                </div>
                <form onSubmit={handleSubmit} className="relative max-w-[200px] mx-auto">
                  <input 
                    ref={inputRef}
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    className="w-full bg-white/5 border-b-4 border-neon-cyan text-center text-5xl font-black py-2 outline-none focus:bg-white/10 transition-all"
                    autoFocus
                  />
                  <div className="absolute -bottom-6 left-0 right-0 text-[10px] font-black uppercase tracking-widest text-gray-500">Pressione ENTER</div>
                </form>
              </div>

              {/* Visual Feedback */}
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.5 }}
                    animate={{ opacity: 1, y: -50, scale: 1.5 }}
                    exit={{ opacity: 0 }}
                    className={`absolute font-black italic text-4xl ${feedback === 'hit' ? 'text-neon-cyan' : 'text-red-500'}`}
                  >
                    {feedback === 'hit' ? 'ESMAGADO!' : 'LENTO!'}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {gameState === 'gameover' && (
            <motion.div 
              key="gameover"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center z-10 w-full max-w-md"
            >
              <h3 className="text-5xl font-black italic uppercase mb-2 text-red-500">VOCÊ FOI ESMAGADO</h3>
              <p className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-8">DURANTE APENAS {enemiesKilled} ABATES</p>
              
              {unlockedSkin && (
                <div className="bg-neon-purple/20 border border-neon-purple/40 p-6 rounded-2xl mb-8 animate-bounce">
                  <div className="flex items-center justify-center gap-3 text-neon-purple font-black uppercase italic mb-2">
                    <Crown className="w-5 h-5" /> STATUS CONQUISTADO
                  </div>
                  <p className="text-white font-black text-xl uppercase">SKIN RARA: {unlockedSkin}</p>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={startGame}
                  className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl text-sm flex items-center justify-center gap-3 hover:bg-neon-cyan transition-colors"
                >
                  <RotateCcw className="w-5 h-5" /> REVIDAR AGORA
                </button>
                <button 
                  onClick={onPlayFullGame}
                  className="w-full py-5 bg-neon-cyan text-black font-black uppercase tracking-widest rounded-xl text-sm flex items-center justify-center gap-3 shadow-lg"
                >
                  <Gamepad2 className="w-5 h-5" /> VIRAR LENDA (FULL)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-black/40 border-t border-white/5 flex justify-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
        <div className="flex items-center gap-2"><Zap className="w-3 h-3" /> Dopamina Instantânea</div>
        <div className="flex items-center gap-2"><Trophy className="w-3 h-3" /> Ranking Global</div>
      </div>
    </div>
  );
};
