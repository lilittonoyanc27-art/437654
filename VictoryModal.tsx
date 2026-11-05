import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { sound } from './sound';
import { Trophy, RotateCcw, Sparkles, Star, Award, Flame } from 'lucide-react';

interface VictoryModalProps {
  score: number;
  totalAnswered: number;
  correctCount: number;
  onRestart: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  score,
  totalAnswered,
  correctCount,
  onRestart,
}) => {
  useEffect(() => {
    sound.playVictory();

    // Multiphase confetti barrage
    const duration = 3.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-lg bg-gradient-to-b from-amber-950/90 via-slate-900 to-slate-950 border-3 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.5)] my-auto relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/20 blur-3xl pointer-events-none" />

        <div className="inline-flex p-4 rounded-3xl bg-amber-500/20 text-amber-300 border-2 border-amber-400/50 mb-3 animate-bounce">
          <Trophy className="w-12 h-12" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>¡VICTORIA! • ՀԱՂԹԱՆԱԿ!</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 mb-1">
          M B A P P É
        </h2>
        <p className="text-sm font-bold text-slate-300 mb-4">
          Секретное слово разгадано! / Գաղտնի բառը բացահայտված է!
        </p>

        {/* Kylian Mbappé Player Profile Card */}
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 text-left mb-6 shadow-inner space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-black text-lg shadow-md border border-amber-400/40">
              #9
            </div>
            <div>
              <div className="text-base font-black text-white flex items-center gap-1.5">
                <span>Kylian Mbappé</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <div className="text-xs text-amber-300/90 font-medium">
                Delantero estrella • Real Madrid & France
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-300 pt-2 border-t border-slate-800 space-y-1">
            <p>
              🇪🇸 <em>"Campeón del Mundo, finalista y uno de los delanteros más rápidos y letales en la historia del fútbol moderno."</em>
            </p>
            <p className="text-emerald-300">
              🇦🇲 <em>«Աշխարհի չեմպիոն, եզրափակչի մասնակից և ժամանակակից ֆուտբոլի պատմության ամենաարագ ու վտանգավոր հարձակվողներից մեկը։»</em>
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{score}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Очки / Միավոր</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <Flame className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{correctCount}/{totalAnswered}</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Верно / Ճիշտ</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            <Sparkles className="w-5 h-5 text-blue-400 mx-auto mb-1" />
            <div className="text-lg font-black text-white">{accuracy}%</div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Точность</div>
          </div>
        </div>

        {/* Restart Button */}
        <button
          onClick={onRestart}
          className="w-full py-4 rounded-2xl font-black text-base bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-xl shadow-amber-900/60 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5 text-slate-950" />
          <span>Сыграть еще раз / Խաղալ նորից (Jugar de nuevo)</span>
        </button>
      </div>
    </div>
  );
};
