import React from 'react';
import { TARGET_WORD } from './questions';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface LetterKeyboardProps {
  guessedLetters: Set<string>;
  onSelectLetter: (letter: string) => void;
  active: boolean;
  message?: string;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const LetterKeyboard: React.FC<LetterKeyboardProps> = ({
  guessedLetters,
  onSelectLetter,
  active,
  message,
}) => {
  const targetChars = new Set(TARGET_WORD.split(''));

  return (
    <div className="w-full max-w-2xl mx-auto my-3 px-3">
      <div className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-md ${
        active 
          ? 'bg-amber-950/40 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-2 ring-amber-400/50' 
          : 'bg-slate-900/60 border-slate-800'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${active ? 'bg-amber-400 animate-ping' : 'bg-slate-600'}`} />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
              <span>Алфавит / Տառերի ցանկ</span>
              {active && <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />}
            </h3>
          </div>

          <span className="text-xs font-medium text-slate-400">
            {active 
              ? '✨ Нажмите на любую доступную букву!' 
              : 'Буквы для отгадывания слова'}
          </span>
        </div>

        {message && (
          <div className="mb-3 p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs sm:text-sm font-semibold text-center flex items-center justify-center gap-2 animate-fadeIn">
            <span>{message}</span>
          </div>
        )}

        {/* Keyboard Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-9 md:grid-cols-13 gap-1.5 sm:gap-2">
          {ALPHABET.map((char) => {
            const isGuessed = guessedLetters.has(char);
            const isHit = isGuessed && targetChars.has(char);
            const isMiss = isGuessed && !targetChars.has(char);

            return (
              <button
                key={char}
                onClick={() => active && !isGuessed && onSelectLetter(char)}
                disabled={!active || isGuessed}
                className={`relative h-10 sm:h-12 rounded-xl font-black text-sm sm:text-base flex items-center justify-center transition-all select-none ${
                  isHit
                    ? 'bg-emerald-600 text-white border-2 border-emerald-400 shadow-lg shadow-emerald-900/50 scale-95'
                    : isMiss
                    ? 'bg-slate-800/80 text-slate-500 border border-slate-700/60 line-through opacity-50 cursor-not-allowed'
                    : active
                    ? 'bg-gradient-to-b from-slate-700 to-slate-800 hover:from-amber-500 hover:to-amber-600 text-white hover:text-slate-950 border border-slate-600 hover:border-amber-300 shadow-md hover:scale-105 active:scale-90 cursor-pointer'
                    : 'bg-slate-800/60 text-slate-400 border border-slate-800 opacity-80 cursor-default'
                }`}
                title={
                  isHit 
                    ? `Буква ${char} есть в слове!` 
                    : isMiss 
                    ? `Буквы ${char} нет` 
                    : `Выбрать букву ${char}`
                }
              >
                <span>{char}</span>
                {isHit && (
                  <CheckCircle2 className="w-3 h-3 text-white absolute bottom-0.5 right-0.5" />
                )}
                {isMiss && (
                  <XCircle className="w-3 h-3 text-red-400 absolute bottom-0.5 right-0.5 opacity-70" />
                )}
              </button>
            );
          })}
        </div>

        {active && (
          <div className="mt-3 text-center text-xs font-bold text-amber-300/90 animate-pulse">
            👆 Ընտրեք տառը՝ գաղտնի բառում ստուգելու համար (Выберите букву для проверки)
          </div>
        )}
      </div>
    </div>
  );
};
