import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/iotContent';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleReset = () => {
    setAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  const score = QUIZ_QUESTIONS.reduce((acc, q) => {
    return answers[q.id] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <section id="quiz" className="py-16 border-b border-[#1f2a4d]/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2">
          <HelpCircle className="w-4 h-4" />
          <span>Évaluation interactive · Contrôle des connaissances</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Testez vos acquis sur l'IoT
        </h2>
        <p className="text-base text-[#9aa6c7] mb-8 leading-relaxed">
          Validez votre compréhension des architectures, protocoles et défis de sécurité à travers ce quiz de 5 questions.
        </p>

        {/* Progress & Actions Header */}
        <div className="p-4 rounded-xl bg-[#141b34] border border-[#1f2a4d] flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="text-xs font-mono text-[#9aa6c7]">
            Progression : <span className="text-cyan-400 font-bold">{answeredCount}</span> / {QUIZ_QUESTIONS.length} questions répondues
          </div>

          <div className="flex items-center gap-2">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={!isComplete}
                className="px-4 py-2 text-xs font-semibold text-[#0b1020] bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all cursor-pointer"
              >
                Valider mes réponses
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0b1020] hover:bg-[#1a2344] border border-[#1f2a4d] rounded-lg transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Recommencer le quiz</span>
              </button>
            )}
          </div>
        </div>

        {/* Score Banner when results shown */}
        {showResults && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/70 to-[#141b34] border border-cyan-500/40 mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Score final : {score} sur {QUIZ_QUESTIONS.length}
                </h3>
                <p className="text-xs text-[#9aa6c7] mt-0.5">
                  {score === 5
                    ? 'Excellent ! Maîtrise exemplaire des concepts physiques, logiciels et réglementaires.'
                    : score >= 3
                    ? 'Bonne compréhension globale des rouages de l\'Internet des objets.'
                    : 'Relisez les chapitres Connectivité et Défis pour consolider les notions clés.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const userAnswer = answers[q.id];
            const isAnswered = userAnswer !== undefined;
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-6 rounded-2xl border transition-all ${
                  showResults
                    ? isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-rose-950/20 border-rose-500/40'
                    : 'bg-[#141b34] border-[#1f2a4d]'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    <span className="font-mono text-cyan-400 mr-2">0{qIndex + 1}.</span>
                    {q.question}
                  </h3>
                  {showResults && (
                    <span className="shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                    </span>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswer === optIdx;
                    let optionStyle = 'bg-[#0b1020] border-[#1f2a4d] text-[#e5e9f5] hover:border-cyan-500/40';

                    if (showResults) {
                      if (optIdx === q.correctAnswer) {
                        optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-200';
                      } else {
                        optionStyle = 'bg-[#0b1020]/60 border-[#1f2a4d] text-[#9aa6c7] opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={showResults}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {showResults && optIdx === q.correctAnswer && (
                          <span className="text-xs font-mono text-emerald-400 font-bold shrink-0 ml-2">Bonne réponse</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on Show Results */}
                {showResults && (
                  <div className="p-3.5 rounded-xl bg-[#0b1020] border border-[#1f2a4d] text-xs text-[#9aa6c7] leading-relaxed">
                    <span className="font-semibold text-cyan-400 block mb-1">Explication technique :</span>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
