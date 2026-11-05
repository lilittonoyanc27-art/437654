import React from 'react';
import { TARGET_WORD } from './questions';
import { Trophy, HelpCircle, KeyRound, Sparkles } from 'lucide-react';

interface WordBoardProps {
  guessedLetters: Set<string>;
  onGuessWordClick: () => void;
  isWordCompleted: boolean;
}

export const WordBoard: React.FC<WordBoardProps> = ({
  guessedLetters,
  onGuessWordClick,
  isWordCompleted,
}) => {
  const letters = TARGET_WORD.split('');
  const revealedCount = letters.filter(l => guessedLetters.has(l)).length;

  return (
    <div className="w-full max-w-2xl mx-auto my-4 px-3">
      {/* Top Banner / Theme Clue */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Trophy className="w-5 h-5" />
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest font-black text-amber-400">
                Секретное слово / Գաղտնի բառը
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Тема: Звезда мирового футбола ⚽ / Համաշխարհային ֆուտբոլի աստղ
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                {revealedCount} / {letters.length} букв открыто
              </span>
            </div>
            <button
              onClick={onGuessWordClick}
              disabled={isWordCompleted}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Назвать слово / Ասել բառը</span>
            </button>
          </div>
        </div>

        {/* Letter Tiles Grid */}
        <div className="flex justify-center items-center gap-2 sm:gap-3.5 py-2">
          {letters.map((char, index) => {
            const isRevealed = guessedLetters.has(char) || isWordCompleted;

            return (
              <div
                key={index}
                className="relative perspective-500 w-11 h-14 sm:w-14 sm:h-20 md:w-16 md:h-22"
              >
                <div
                  className={`w-full h-full rounded-xl transition-all duration-700 transform-style-3d flex items-center justify-center font-black select-none border-2 shadow-xl ${
                    isRevealed
                      ? 'bg-gradient-to-b from-amber-100 via-white to-amber-200 border-amber-400 text-slate-900 shadow-amber-500/20 scale-105'
                      : 'bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 border-emerald-600/50 text-emerald-400/80 shadow-black'
                  }`}
                  style={{
                    transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(0deg)',
                  }}
                >
                  {isRevealed ? (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl md:text-4xl tracking-tighter drop-shadow-sm font-black text-slate-950">
                        {char}
                      </span>
                      <span className="text-[8px] sm:text-[9px] uppercase font-bold text-amber-700 tracking-wider">
                        №{index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1 opacity-70">
                      <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400/60" />
                      <span className="text-[9px] font-semibold text-slate-400">
                        {index + 1}
                      </span>
                    </div>
                  )}

                  {/* Corner metallic rivets */}
                  <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-slate-400/40" />
                  <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-slate-400/40" />
                  <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-slate-400/40" />
                  <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-slate-400/40" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Subtitle hint */}
        <div className="mt-3 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>
            Отвечайте правильно на футбольные вопросы, чтобы открывать буквы!
          </span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-amber-300/80">
            Ճիշտ պատասխանեք հարցերին՝ տառերը բացելու համար
          </span>
        </div>
      </div>
    </div>
  );
};
