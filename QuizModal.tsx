import React, { useState } from 'react';
import { Question } from './questions';
import { sound } from './sound';
import { Volume2, Languages, Check, X, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  question: Question;
  spinPoints: number;
  onAnswerSubmit: (isCorrect: boolean) => void;
  onClose?: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  question,
  spinPoints,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [revealedTranslations, setRevealedTranslations] = useState<{ [key: string]: boolean }>({});
  const [revealAll, setRevealAll] = useState<boolean>(false);

  const toggleTranslation = (key: string) => {
    setRevealedTranslations(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    const isCorrect = index === question.correctIndex;
    if (isCorrect) {
      sound.playCorrect();
    } else {
      sound.playWrong();
    }
  };

  const isQuestionTranslationOpen = revealAll || !!revealedTranslations['question'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/50 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚽</span>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 block">
                Вопрос №{question.id} • Сектор: {spinPoints} очков
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                Հարց №{question.id} • {spinPoints} միավոր
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle all translations button */}
            <button
              onClick={() => setRevealAll(!revealAll)}
              className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Переключить показ всех армянских переводов"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline">
                {revealAll ? 'Скрыть арм. перевод' : 'Все переводы (Հայերեն)'}
              </span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Hint banner about clicking for translation */}
          <div className="text-xs text-amber-300/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
            <span>
              💡 <strong>Кликните на испанский текст</strong>, чтобы увидеть армянский перевод! (Սեղմեք իսպաներենի վրա)
            </span>
          </div>

          {/* Question Box */}
          <div 
            onClick={() => toggleTranslation('question')}
            className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-amber-400/50 transition-all cursor-pointer group shadow-inner"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="text-base sm:text-lg font-bold text-white group-hover:text-amber-200 transition-colors flex items-center gap-2">
                  <span>{question.es}</span>
                </div>

                {/* Armenian Translation */}
                <div className={`text-sm sm:text-base font-semibold text-emerald-300 transition-all duration-300 overflow-hidden ${
                  isQuestionTranslationOpen ? 'max-h-32 opacity-100 pt-1.5 border-t border-slate-700/60 mt-1.5' : 'max-h-0 opacity-0'
                }`}>
                  🇦🇲 {question.hy}
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    sound.speak(question.es, 'es-ES');
                  }}
                  className="p-2 rounded-lg bg-slate-700/60 hover:bg-amber-500/20 text-slate-300 hover:text-amber-300 transition-colors"
                  title="Озвучить на испанском"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                  {isQuestionTranslationOpen ? 'ARM ✓' : 'ES 👆'}
                </span>
              </div>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === question.correctIndex;
              const showArm = revealAll || !!revealedTranslations[`opt_${idx}`];

              let cardStyle = 'bg-slate-800/70 border-slate-700 hover:bg-slate-800 hover:border-amber-400/60 text-slate-200';
              if (isAnswered) {
                if (isCorrectOpt) {
                  cardStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
                } else if (isSelected && !isCorrectOpt) {
                  cardStyle = 'bg-red-950/80 border-red-500 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.3)]';
                } else {
                  cardStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
                }
              }

              return (
                <div
                  key={opt.letter}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 ${cardStyle}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {/* Main Option Clickable to answer or toggle */}
                    <div 
                      onClick={() => {
                        if (!isAnswered) {
                          handleSelectOption(idx);
                        } else {
                          toggleTranslation(`opt_${idx}`);
                        }
                      }}
                      className="flex items-start gap-3 flex-1 cursor-pointer"
                    >
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-sm ${
                        isAnswered && isCorrectOpt
                          ? 'bg-emerald-500 text-slate-950'
                          : isAnswered && isSelected
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-700 text-amber-300'
                      }`}>
                        {opt.letter}
                      </span>

                      <div className="flex-1">
                        <div className="text-sm sm:text-base font-semibold leading-snug">
                          {opt.es}
                        </div>

                        {/* Armenian translation */}
                        <div className={`text-xs sm:text-sm font-medium text-emerald-300 transition-all duration-200 ${
                          showArm ? 'max-h-24 opacity-100 mt-1 pt-1 border-t border-slate-700/40' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}>
                          🇦🇲 {opt.hy}
                        </div>
                      </div>
                    </div>

                    {/* Actions: Pronounce + Toggle translation indicator */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTranslation(`opt_${idx}`);
                        }}
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-colors ${
                          showArm
                            ? 'bg-emerald-900/50 text-emerald-300 border-emerald-700'
                            : 'bg-slate-700/60 text-slate-400 border-slate-600 hover:text-amber-300'
                        }`}
                        title="Нажмите, чтобы открыть перевод на армянский"
                      >
                        {showArm ? 'ARM' : 'Թարգմ'}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          sound.speak(opt.es, 'es-ES');
                        }}
                        className="p-1 rounded text-slate-400 hover:text-amber-300"
                        title="Озвучить"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {isAnswered && isCorrectOpt && (
                        <Check className="w-5 h-5 text-emerald-400" />
                      )}
                      {isAnswered && isSelected && !isCorrectOpt && (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Feedback & Result Box when answered */}
          {isAnswered && (
            <div className={`p-4 rounded-2xl border transition-all animate-fadeIn ${
              selectedOption === question.correctIndex
                ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                : 'bg-amber-950/40 border-amber-500/60 text-amber-200'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-black text-base">
                {selectedOption === question.correctIndex ? (
                  <>
                    <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
                    <span>¡Correcto! / Ճիշտ է! (+{spinPoints} очков)</span>
                  </>
                ) : (
                  <>
                    <span className="text-xl">⚽</span>
                    <span>Не совсем верно, но вы продолжаете играть! (Շարունակել խաղը)</span>
                  </>
                )}
              </div>

              {/* Tactical Explanation */}
              <div className="text-xs sm:text-sm text-slate-300 space-y-1 bg-slate-900/70 p-3 rounded-xl border border-slate-800">
                <div className="font-medium text-slate-200">
                  ⚽ <strong>{question.explanationEs}</strong>
                </div>
                <div className="text-emerald-300 font-medium">
                  🇦🇲 {question.explanationHy}
                </div>
              </div>

              {/* Action Button: Correct -> Pick Letter; Incorrect -> Continue playing */}
              <div className="mt-4 flex justify-end">
                {selectedOption === question.correctIndex ? (
                  <button
                    onClick={() => onAnswerSubmit(true)}
                    className="px-6 py-3 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-lg shadow-emerald-900/50 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Выбрать букву / Ընտրել տառը</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                ) : (
                  <button
                    onClick={() => onAnswerSubmit(false)}
                    className="px-6 py-3 rounded-2xl font-black text-sm sm:text-base bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-900/40 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <span>Продолжить игру / Շարունակել խաղը</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
