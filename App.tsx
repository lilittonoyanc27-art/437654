import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QUESTIONS, TARGET_WORD, Question } from './questions';
import { sound } from './sound';
import { Wheel, WheelSector } from './Wheel';
import { WordBoard } from './WordBoard';
import { LetterKeyboard } from './LetterKeyboard';
import { QuizModal } from './QuizModal';
import { GuessWordModal } from './GuessWordModal';
import { VictoryModal } from './VictoryModal';
import { DictionaryModal } from './DictionaryModal';
import { 
  Volume2, 
  VolumeX, 
  BookOpen, 
  RotateCcw, 
  Sparkles, 
  Award, 
  Flame, 
  CheckCircle2,
  HelpCircle,
  Trophy
} from 'lucide-react';

type GamePhase = 'SPIN' | 'QUESTION' | 'PICK_LETTER' | 'VICTORY';

export default function App() {
  const [score, setScore] = useState<number>(0);
  const [roundNumber, setRoundNumber] = useState<number>(1);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [gamePhase, setGamePhase] = useState<GamePhase>('SPIN');
  const [currentSector, setCurrentSector] = useState<WheelSector | null>(null);
  
  // Question tracking
  const [questionIndices, setQuestionIndices] = useState<number[]>(() => {
    // Generate randomized order of all 20 questions
    const arr = QUESTIONS.map((_, i) => i);
    return arr.sort(() => Math.random() - 0.5);
  });
  const [currentQuestionPointer, setCurrentQuestionPointer] = useState<number>(0);

  // Stats
  const [totalAnswered, setTotalAnswered] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  // Modals
  const [isGuessWordOpen, setIsGuessWordOpen] = useState<boolean>(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState<boolean>(false);
  const [soundActive, setSoundActive] = useState<boolean>(sound.enabled);
  const [keyboardMessage, setKeyboardMessage] = useState<string>('');

  const currentQuestion: Question = QUESTIONS[questionIndices[currentQuestionPointer % QUESTIONS.length]];

  // Check if MBAPPE is completed
  const targetChars = new Set(TARGET_WORD.split(''));
  const isWordCompleted = Array.from(targetChars).every(char => guessedLetters.has(char));

  useEffect(() => {
    if (isWordCompleted && gamePhase !== 'VICTORY') {
      setGamePhase('VICTORY');
    }
  }, [isWordCompleted, gamePhase]);

  // Handle Drum Spin End
  const handleSpinEnd = (sector: WheelSector) => {
    setCurrentSector(sector);
    setGamePhase('QUESTION');
  };

  // Handle Quiz Answer Submit
  const handleAnswerSubmit = (isCorrect: boolean) => {
    setTotalAnswered(prev => prev + 1);

    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
      const pointsToAdd = currentSector ? currentSector.points : 500;
      setScore(prev => prev + pointsToAdd);

      // User requirement: "а если ответ верный нужно самому из списка букв выбрать букву"
      setKeyboardMessage(`🎉 Ճիշտ է! Դուք վաստակեցիք +${pointsToAdd} միավոր: Այժմ ընտրեք տառը՝ գաղտնի բառում ստուգելու համար!`);
      setGamePhase('PICK_LETTER');
    } else {
      // User requirement: "если ответ неверный всё равно продолжить играть"
      // Player gets sympathy encouragement + 50 participation points and continues playing!
      setScore(prev => prev + 50);
      setKeyboardMessage('Ոչինչ, խաղը շարունակվում է: Պտտեք բարաբանը հաջորդ հարցի համար! (Игра продолжается)');
      
      // Advance to next question in sequence
      setCurrentQuestionPointer(prev => prev + 1);
      setRoundNumber(prev => prev + 1);
      setGamePhase('SPIN');
    }
  };

  // Handle Letter Choice from Alphabet
  const handleSelectLetter = (letter: string) => {
    if (gamePhase !== 'PICK_LETTER') return;
    if (guessedLetters.has(letter)) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const isInWord = TARGET_WORD.includes(letter);

    if (isInWord) {
      sound.playLetterReveal();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 }
      });

      const count = TARGET_WORD.split('').filter(c => c === letter).length;
      const letterBonus = count * 300;
      setScore(prev => prev + letterBonus);

      // Check if all letters are now solved
      const updatedSolved = Array.from(targetChars).every(c => newGuessed.has(c));
      if (updatedSolved) {
        setGamePhase('VICTORY');
        return;
      }

      setKeyboardMessage(`✨ Կա՛ «${letter}» տառը (${count} հատ)! Դուք ստացաք +${letterBonus} միավոր: Պտտեք բարաբանը!`);
    } else {
      sound.playWrong();
      setKeyboardMessage(`«${letter}» տառը չկա Mbappe բառում, բայց խաղը շարունակվում է! Պտտեք բարաբանը!`);
    }

    // Advance to next question and return to SPIN
    setCurrentQuestionPointer(prev => prev + 1);
    setRoundNumber(prev => prev + 1);
    setGamePhase('SPIN');
  };

  // Instant victory when whole word is guessed
  const handleGuessWordSuccess = () => {
    setIsGuessWordOpen(false);
    // Reveal all letters
    const all = new Set(guessedLetters);
    TARGET_WORD.split('').forEach(c => all.add(c));
    setGuessedLetters(all);
    setScore(prev => prev + 5000);
    setGamePhase('VICTORY');
  };

  // Restart game
  const handleRestart = () => {
    setScore(0);
    setRoundNumber(1);
    setGuessedLetters(new Set());
    setTotalAnswered(0);
    setCorrectCount(0);
    setQuestionIndices(QUESTIONS.map((_, i) => i).sort(() => Math.random() - 0.5));
    setCurrentQuestionPointer(0);
    setKeyboardMessage('');
    setGamePhase('SPIN');
  };

  const toggleSound = () => {
    const val = sound.toggleMute();
    setSoundActive(val);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Background Stadium Atmosphere Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[110px]" />
        {/* Subtle pitch pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      {/* Top Navbar */}
      <header className="relative z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-3 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-3">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black text-xl sm:text-2xl shadow-lg shadow-amber-500/20 border-2 border-white/60">
              ⚽
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-lg font-black tracking-tight text-white uppercase">
                  Поле Чудес • Fútbol
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase">
                  ESP ⇄ ARM
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-300 font-medium">
                Հրաշքների Դաշտ • Գաղտնի բառը՝ <strong className="text-white">MBAPPE</strong>
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDictionaryOpen(true)}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer"
              title="Футбольный разговорник: 20 вопросов и переводов"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Բառարան / Словарь</span>
            </button>

            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                soundActive 
                  ? 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700' 
                  : 'bg-red-950/40 border-red-500/40 text-red-400 hover:bg-red-950/60'
              }`}
              title={soundActive ? 'Выключить звук' : 'Включить звук'}
            >
              {soundActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
              title="Начать заново / Սկսել նորից"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl w-full mx-auto p-3 sm:p-5 flex flex-col items-center">
        {/* Game Stats Bar */}
        <div className="w-full max-w-2xl grid grid-cols-3 gap-2 sm:gap-3 mb-2">
          {/* Score */}
          <div className="bg-slate-900/80 border border-amber-500/30 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Очки / Միավոր
              </div>
              <div className="text-base sm:text-xl font-black text-amber-400 leading-tight">
                {score.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Round */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Раунд / Փուլ
              </div>
              <div className="text-base sm:text-xl font-black text-white leading-tight">
                #{roundNumber}
              </div>
            </div>
          </div>

          {/* Accuracy */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5 sm:p-3 flex items-center gap-2.5 shadow-md">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Ответов / Ճիշտ
              </div>
              <div className="text-base sm:text-xl font-black text-emerald-400 leading-tight">
                {correctCount} / {totalAnswered}
              </div>
            </div>
          </div>
        </div>

        {/* Secret Word Board (M B A P P E) */}
        <WordBoard
          guessedLetters={guessedLetters}
          onGuessWordClick={() => setIsGuessWordOpen(true)}
          isWordCompleted={isWordCompleted}
        />

        {/* Phase Specific Instructions / Notice */}
        {gamePhase === 'SPIN' && (
          <div className="w-full max-w-2xl bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-3 my-2 text-center text-xs sm:text-sm text-emerald-200 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
            <span>
              Крутите барабан! Ответьте на испанский вопрос, чтобы получить право выбрать букву.
            </span>
          </div>
        )}

        {gamePhase === 'PICK_LETTER' && (
          <div className="w-full max-w-2xl bg-amber-950/40 border border-amber-400/60 rounded-2xl p-3.5 my-2 text-center text-sm font-bold text-amber-200 flex items-center justify-center gap-2 animate-bounce">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>
              🎉 Верно! Выберите букву из списка ниже для слова MBAPPE! (Ընտրեք տառը)
            </span>
          </div>
        )}

        {/* Wheel of Fortune Drum */}
        <div className="my-2">
          <Wheel
            onSpinEnd={handleSpinEnd}
            disabled={gamePhase !== 'SPIN'}
          />
        </div>

        {/* Letter Picker Keyboard */}
        <LetterKeyboard
          guessedLetters={guessedLetters}
          onSelectLetter={handleSelectLetter}
          active={gamePhase === 'PICK_LETTER'}
          message={keyboardMessage}
        />

        {/* Footer Quick Instructions / Help */}
        <div className="w-full max-w-2xl mt-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-slate-300">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Правила игры «Поле Чудес: Футбол»:</span>
          </div>
          <p>
            1. <strong>Крутите барабан</strong>, чтобы определить очки за раунд и получить футбольный вопрос.
          </p>
          <p>
            2. Нажмите на <strong>испанский текст</strong> любого вопроса или варианта, чтобы мгновенно увидеть <strong>армянский перевод</strong>!
          </p>
          <p>
            3. Если ответ неверный — <strong>игра продолжается</strong>! А если верный — вы сами выбираете букву из списка для секретного слова <strong>MBAPPE</strong>!
          </p>
        </div>
      </main>

      {/* Quiz Modal when landed on Sector */}
      {gamePhase === 'QUESTION' && currentSector && (
        <QuizModal
          question={currentQuestion}
          spinPoints={currentSector.points}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {/* Guess Whole Word Modal */}
      <GuessWordModal
        isOpen={isGuessWordOpen}
        onClose={() => setIsGuessWordOpen(false)}
        onSuccess={handleGuessWordSuccess}
      />

      {/* Dictionary Modal */}
      <DictionaryModal
        isOpen={isDictionaryOpen}
        onClose={() => setIsDictionaryOpen(false)}
      />

      {/* Grand Victory Modal */}
      {gamePhase === 'VICTORY' && (
        <VictoryModal
          score={score}
          totalAnswered={totalAnswered}
          correctCount={correctCount}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
