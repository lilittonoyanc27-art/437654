import React, { useState } from 'react';
import { TARGET_WORD } from './questions';
import { Trophy, X, Sparkles, AlertCircle } from 'lucide-react';

interface GuessWordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const GuessWordModal: React.FC<GuessWordModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputVal.trim().toUpperCase().replace(/[^A-Z]/g, '');

    if (clean === TARGET_WORD) {
      setError(null);
      onSuccess();
    } else {
      setError('Неверно! Попробуйте еще раз или продолжайте открывать буквы по одной (Ոչ ճիշտ է)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">
              Назвать слово целиком
            </h3>
            <p className="text-xs text-amber-300 font-semibold">
              Գուշակել ամբողջ բառը
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-4">
          Если вы уверены, какое футбольное имя или фамилия спрятаны на табло из 6 букв, введите его здесь:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              autoFocus
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Введите слово (напр. MBAPPE)"
              maxLength={15}
              className="w-full px-4 py-3.5 rounded-2xl bg-slate-800/90 border-2 border-slate-700 focus:border-amber-400 text-white font-mono uppercase text-center text-xl tracking-widest placeholder:text-slate-500 placeholder:text-sm placeholder:normal-case outline-none transition-all shadow-inner"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl text-sm font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Отмена / Չեղարկել
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl text-sm font-black bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-lg shadow-amber-900/50 flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Проверить / Ստուգել</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
