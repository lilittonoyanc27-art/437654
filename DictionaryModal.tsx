import React, { useState } from 'react';
import { QUESTIONS } from './questions';
import { sound } from './sound';
import { BookOpen, X, Volume2, Search, CheckCircle } from 'lucide-react';

interface DictionaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DictionaryModal: React.FC<DictionaryModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [revealedIds, setRevealedIds] = useState<Record<number, boolean>>({});

  if (!isOpen) return null;

  const toggleArmenian = (id: number) => {
    setRevealedIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredQuestions = QUESTIONS.filter(q => 
    q.es.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.hy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.options.some(o => o.es.toLowerCase().includes(searchTerm.toLowerCase()) || o.hy.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[90vh] bg-slate-900 border-2 border-amber-500/50 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Футбольный разговорник: ESP ⇄ ARM
              </h3>
              <p className="text-xs text-amber-300 font-semibold">
                Բոլոր 20 ֆուտբոլային հարցերն ու պատասխանները (Ֆուտբոլային բառարան)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-slate-800 bg-slate-950/40">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Поиск по испански или армянски... (Որոնել...)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Questions List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {filteredQuestions.map((q) => {
            const isArmRevealed = revealedIds[q.id] ?? true;

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 hover:border-amber-500/40 transition-all space-y-3"
              >
                {/* Question Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div 
                      onClick={() => toggleArmenian(q.id)}
                      className="text-sm sm:text-base font-bold text-white hover:text-amber-300 cursor-pointer transition-colors"
                    >
                      <span className="text-amber-400 mr-1.5">#{q.id}</span>
                      {q.es}
                    </div>
                    {isArmRevealed && (
                      <div className="text-xs sm:text-sm font-semibold text-emerald-300 pt-1 border-t border-slate-700/40">
                        🇦🇲 {q.hy}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => sound.speak(q.es, 'es-ES')}
                      className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-amber-300 transition-colors"
                      title="Озвучить на испанском"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleArmenian(q.id)}
                      className="text-[10px] font-bold px-2 py-1 rounded bg-slate-700 text-amber-300 hover:bg-slate-600 transition-colors cursor-pointer"
                    >
                      {isArmRevealed ? 'ARM ✓' : 'ARM 👆'}
                    </button>
                  </div>
                </div>

                {/* Options List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.correctIndex;

                    return (
                      <div
                        key={opt.letter}
                        className={`p-2.5 rounded-xl border text-xs sm:text-sm ${
                          isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                            : 'bg-slate-800/80 border-slate-700/60 text-slate-300'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                            isCorrect ? 'bg-emerald-500 text-slate-950 font-black' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {opt.letter}
                          </span>
                          <div className="flex-1">
                            <div className="font-semibold">{opt.es}</div>
                            {isArmRevealed && (
                              <div className="text-xs text-emerald-300 font-medium mt-0.5">
                                🇦🇲 {opt.hy}
                              </div>
                            )}
                          </div>
                          {isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
