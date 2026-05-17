import { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

interface QuizEngineProps {
  quizId: string;
  title?: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, passed: boolean) => void;
  passingScore?: number;
}

export default function QuizEngine({ 
  quizId: _quizId, 
  title = "Evaluasi Pemahaman", 
  questions, 
  onComplete,
  passingScore = 80 
}: QuizEngineProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedAnswer === questions[currentQuestion].correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalScore = Math.round((score + (selectedAnswer === questions[currentQuestion].correctAnswerIndex ? 1 : 0)) / questions.length * 100);
      onComplete?.(finalScore, finalScore >= passingScore);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  const q = questions[currentQuestion];
  const finalScorePercent = Math.round((score / questions.length) * 100);
  const isPassed = finalScorePercent >= passingScore;

  if (isFinished) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-xl">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex justify-center mb-6"
        >
          {isPassed ? (
            <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <Trophy size={48} />
            </div>
          ) : (
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center">
              <AlertCircle size={48} />
            </div>
          )}
        </motion.div>
        
        <h3 className="text-2xl md:text-3xl font-black mb-2 text-black dark:text-white">
          {isPassed ? 'Luar Biasa!' : 'Belum Lulus'}
        </h3>
        <p className="text-black/60 dark:text-white/60 mb-8">
          Anda mendapatkan skor <span className="font-bold text-black dark:text-white">{finalScorePercent}</span> dari 100.
          {isPassed 
            ? ' Anda telah memahami materi ini dengan sangat baik.' 
            : ` Syarat kelulusan adalah skor ${passingScore}. Silakan pelajari kembali materinya.`}
        </p>

        <button 
          onClick={handleRetry}
          className="flex items-center justify-center gap-2 w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold hover:scale-[1.02] active:scale-95 transition-all"
        >
          <RefreshCw size={20} />
          Ulangi Kuis
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg text-black dark:text-white">{title}</h3>
        <span className="text-sm font-bold px-3 py-1 bg-black/10 dark:bg-white/10 rounded-full text-black/70 dark:text-white/70">
          Pertanyaan {currentQuestion + 1} / {questions.length}
        </span>
      </div>

      <div className="mb-8">
        <h4 className="text-xl md:text-2xl font-semibold text-black dark:text-white leading-relaxed">
          {q.question}
        </h4>
      </div>

      <div className="space-y-3 mb-8">
        {q.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === q.correctAnswerIndex;
          
          let stateClass = "bg-white dark:bg-zinc-800 border-black/10 dark:border-white/10 text-black dark:text-white hover:border-black dark:hover:border-white";
          
          if (isAnswered) {
            if (isCorrect) {
              stateClass = "bg-green-50 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-400";
            } else if (isSelected && !isCorrect) {
              stateClass = "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
            } else {
              stateClass = "bg-white/50 dark:bg-zinc-800/50 border-black/5 dark:border-white/5 text-black/40 dark:text-white/40 opacity-50";
            }
          } else if (isSelected) {
            stateClass = "bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-400 ring-2 ring-blue-500/20";
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${stateClass}`}
            >
              <span className="font-medium pr-4">{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="shrink-0 text-green-500" size={20} />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="shrink-0 text-red-500" size={20} />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-8 ${
              selectedAnswer === q.correctAnswerIndex 
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
            }`}
          >
            <p className="font-bold mb-1">
              {selectedAnswer === q.correctAnswerIndex ? 'Jawaban Benar!' : 'Jawaban Salah!'}
            </p>
            <p className="text-sm opacity-90">{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isAnswered ? handleNext : handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-xl font-bold transition-all disabled:opacity-30 hover:bg-zinc-800 dark:hover:bg-zinc-200"
      >
        {isAnswered ? (currentQuestion === questions.length - 1 ? 'Selesaikan Kuis' : 'Lanjut ke Pertanyaan Berikutnya') : 'Cek Jawaban'}
      </button>
    </div>
  );
}
