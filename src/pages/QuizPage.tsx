import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Star, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  Brain,
  RotateCcw,
  History
} from 'lucide-react';
import SEOHead from '../components/SEOHead';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "In which year did Bangladesh win the ICC Trophy to qualify for their first World Cup?",
    options: ["1995", "1997", "1999", "2001"],
    answer: "1997"
  },
  {
    id: 2,
    question: "Who scored a century in Bangladesh's inaugural Test match against India?",
    options: ["Habibul Bashar", "Aminul Islam", "Akram Khan", "Khaled Mashud"],
    answer: "Aminul Islam"
  },
  {
    id: 3,
    question: "Bangladesh defeated which country in their first-ever World Cup match win?",
    options: ["India", "Kenya", "Scotland", "Pakistan"],
    answer: "Pakistan"
  },
  {
    id: 4,
    question: "Which player's century led Bangladesh to a stunning win over Australia at Cardiff in 2005?",
    options: ["Shakib Al Hasan", "Tamim Iqbal", "Mohammad Ashraful", "Habibul Bashar"],
    answer: "Mohammad Ashraful"
  },
  {
    id: 5,
    question: "Bangladesh knocked out which team from the 2007 World Cup in Port of Spain?",
    options: ["Pakistan", "Sri Lanka", "India", "Australia"],
    answer: "India"
  },
  {
    id: 6,
    question: "Shakib Al Hasan became No.1 ODI all-rounder in which year?",
    options: ["2007", "2008", "2009", "2010"],
    answer: "2009"
  },
  {
    id: 7,
    question: "Who was the first Bangladeshi to score a double century in Test cricket?",
    options: ["Tamim Iqbal", "Shakib Al Hasan", "Mominul Haque", "Mushfiqur Rahim"],
    answer: "Mushfiqur Rahim"
  },
  {
    id: 8,
    question: "Bangladesh defeated England for the first time in a Test match in which city?",
    options: ["Chittagong", "Dhaka", "Sylhet", "Khulna"],
    answer: "Dhaka"
  },
  {
    id: 9,
    question: "Which bowler took 12 wickets in Bangladesh's first Test win vs England in 2016?",
    options: ["Shakib Al Hasan", "Mustafizur Rahman", "Mehidy Hasan Miraz", "Taskin Ahmed"],
    answer: "Mehidy Hasan Miraz"
  },
  {
    id: 10,
    question: "Bangladesh won the U19 World Cup in 2020 by defeating which country in the final?",
    options: ["Pakistan", "India", "England", "Afghanistan"],
    answer: "India"
  },
  {
    id: 11,
    question: "In which country did Bangladesh win their first-ever Test series away from home in 2009?",
    options: ["Zimbabwe", "West Indies", "Ireland", "Kenya"],
    answer: "West Indies"
  },
  {
    id: 12,
    question: "Bangladesh swept England 3-0 in T20Is in 2023. Who was Bangladesh's captain?",
    options: ["Shakib Al Hasan", "Tamim Iqbal", "Litton Das", "Najmul Hossain Shanto"],
    answer: "Najmul Hossain Shanto"
  },
  {
    id: 13,
    question: "In 2024, Bangladesh won a historic Test series in which country for the first time?",
    options: ["India", "Australia", "Pakistan", "New Zealand"],
    answer: "Pakistan"
  },
  {
    id: 14,
    question: "Which bowler dismissed the last wicket to seal Bangladesh's first Test win vs Australia in 2017?",
    options: ["Mustafizur Rahman", "Taskin Ahmed", "Shakib Al Hasan", "Mehidy Hasan Miraz"],
    answer: "Shakib Al Hasan"
  },
  {
    id: 15,
    question: "How many runs did Bangladesh win by in their first ODI win on home soil vs India in 2004?",
    options: ["5 runs", "10 runs", "15 runs", "20 runs"],
    answer: "15 runs"
  }
];

type QuizState = 'START' | 'QUESTION' | 'RESULTS';

export default function QuizPage() {
  const [state, setState] = useState<QuizState>('START');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<{ questionIndex: number; selectedOption: string; isCorrect: boolean }[]>([]);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStartQuiz = () => {
    setState('QUESTION');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;

    const isCorrect = option === currentQuestion.answer;
    setSelectedOption(option);
    setIsAnswered(true);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionIndex: currentQuestionIndex,
        selectedOption: option,
        isCorrect
      }
    ]);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setState('RESULTS');
    }
  };

  const getPerformanceLabel = () => {
    if (score >= 13) return "🏆 Cricket Legend!";
    if (score >= 10) return "⭐ Outstanding!";
    if (score >= 7) return "👏 Good Effort!";
    if (score >= 4) return "📚 Keep Learning!";
    return "🏏 Just Getting Started!";
  };

  const getScoreColor = () => {
    if (score >= 10) return "text-[#006a4e]";
    if (score >= 6) return "text-amber-500";
    return "text-[#f42a41]";
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <Helmet>
        <title>Cricket Quiz | Cricketer.bd</title>
      </Helmet>
      <SEOHead 
        title="Cricket Quiz | Cricketer.bd" 
        description="Test your knowledge about Bangladesh cricket history with our fun trivia quiz. 15 questions about historic moments."
      />

      {/* Hero Header */}
      <div className="bg-[#006a4e] py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 mb-6"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-white">🏏 Bangladesh Cricket Trivia</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none mb-4"
          >
            Test Your <span className="text-amber-400">Knowledge</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 font-medium max-w-xl mx-auto"
          >
            15 questions about the historic moments of Bangladesh cricket
          </motion.p>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10 pointer-events-none">
          <Brain className="w-96 h-96 text-white" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20">
        <AnimatePresence mode="wait">
          {state === 'START' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100 text-center"
            >
              <div className="w-24 h-24 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Trophy className="w-12 h-12 text-[#006a4e]" />
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight mb-8">Ready for the Challenge?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <Brain className="w-6 h-6 text-[#006a4e] mx-auto mb-2" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">15 Questions</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <History className="w-6 h-6 text-[#006a4e] mx-auto mb-2" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cricket History</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <Star className="w-6 h-6 text-[#006a4e] mx-auto mb-2" />
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Instant Results</p>
                </div>
              </div>

              <button
                onClick={handleStartQuiz}
                className="w-full py-5 bg-[#006a4e] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#005a42] transition-all shadow-lg hover:shadow-xl active:scale-95"
              >
                Start Quiz
              </button>
            </motion.div>
          )}

          {state === 'QUESTION' && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center space-x-1.5 bg-flag-50 px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 text-[#006a4e] fill-[#006a4e]" />
                    <span className="text-xs font-black text-[#006a4e]">Score: {score}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    className="h-full bg-[#006a4e]"
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 leading-tight">
                  {currentQuestion.question}
                </h2>

                <div className="grid grid-cols-1 gap-4">
                  {currentQuestion.options.map((option, idx) => {
                    let buttonClass = "bg-white border-gray-100 text-gray-700 hover:border-[#006a4e] hover:bg-flag-50";
                    let Icon = null;

                    if (isAnswered) {
                      if (option === currentQuestion.answer) {
                        buttonClass = "bg-[#006a4e] border-[#006a4e] text-white";
                        Icon = CheckCircle;
                      } else if (option === selectedOption) {
                        buttonClass = "bg-[#f42a41] border-[#f42a41] text-white";
                        Icon = XCircle;
                      } else {
                        buttonClass = "bg-white border-gray-100 text-gray-300 opacity-50";
                      }
                    }

                    return (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        disabled={isAnswered}
                        onClick={() => handleOptionClick(option)}
                        className={`flex items-center justify-between p-5 rounded-2xl border-2 font-bold text-left transition-all ${buttonClass}`}
                      >
                        <span>{option}</span>
                        {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                      </motion.button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {isAnswered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8"
                    >
                      <button
                        onClick={handleNextQuestion}
                        className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2"
                      >
                        <span>{currentQuestionIndex === QUIZ_QUESTIONS.length - 1 ? 'See Results' : 'Next Question'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {state === 'RESULTS' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* Score Card */}
              <div className="bg-white rounded-[2.5rem] p-12 shadow-xl border border-gray-100 text-center">
                <div className="w-20 h-20 bg-flag-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-[#006a4e]" />
                </div>
                
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Your Final Score</p>
                <h2 className={`text-7xl font-black mb-4 ${getScoreColor()}`}>
                  {score} <span className="text-gray-200 text-4xl">/ {QUIZ_QUESTIONS.length}</span>
                </h2>
                
                <p className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">
                  {getPerformanceLabel()}
                </p>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    onClick={handleStartQuiz}
                    className="flex-1 py-4 bg-[#006a4e] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#005a42] transition-all flex items-center justify-center space-x-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Play Again</span>
                  </button>
                  <Link
                    to="/milestones"
                    className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center space-x-2"
                  >
                    <History className="w-4 h-4" />
                    <span>View Milestones</span>
                  </Link>
                </div>
              </div>

              {/* Summary List */}
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-gray-100">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-8 border-b border-gray-100 pb-4">
                  Question Summary
                </h3>
                
                <div className="space-y-6">
                  {QUIZ_QUESTIONS.map((q, idx) => {
                    const answer = userAnswers.find(a => a.questionIndex === idx);
                    return (
                      <div key={q.id} className="flex items-start space-x-4">
                        <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${answer?.isCorrect ? 'bg-flag-50 text-[#006a4e]' : 'bg-red-50 text-[#f42a41]'}`}>
                          {answer?.isCorrect ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1">{q.question}</p>
                          <p className="text-xs text-gray-500">
                            Correct Answer: <span className="font-bold text-[#006a4e]">{q.answer}</span>
                          </p>
                          {!answer?.isCorrect && (
                            <p className="text-xs text-[#f42a41] mt-0.5">
                              Your Answer: <span className="font-bold">{answer?.selectedOption}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
