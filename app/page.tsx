'use client';

import { useState } from 'react';

// Define types for the quiz questions
type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

// Static array of quiz questions
const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
  {
    id: 2,
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    correctAnswer: 'Mars',
  },
  {
    id: 3,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctAnswer: 'Pacific',
  },
];

const QuizPage = () => {
  // შექმენით 3 ცვლადი და მიანიჭეთ მათ შესაბამისი საწყისი მნიშვნელობები
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // პირველი ცვლადი : currentQuestion - მიმდინარე კითხვის ინდექსი (რომ გავიგოთ მერამდენე კითცვაზეა მომხმარებელი)
  const [score, setScore] = useState(0);
  // მეორე ცლვადი: score - მომხმარებლის ქულა, სამომავლოდ დავუმატებთ ერთს თუ სწორი იქნება,
  const [isComplete, setIsComplete] = useState(false);
  // მესამე ცვლადი : isCompleted - ქვიზის დასრულების სტატუსი (რომ გავიგოთ მართლა დასრულდა თუ არა ქვიზი)

  const handleAnswer = (selectedOption: string): void => {
    const question = quizQuestions[currentQuestion];

    if (selectedOption === question.correctAnswer) {
      setScore((prev) => prev + 1);
    }

    // ამჟამინდელი კითხვის შენახვა

    // შევამოწმოთ სწორი არის თუ არა კითხვა რომელიც მომხარებელმა აირჩია
    // გადავიყვანოთ შემდეგ კითხვაზე და თუ კითხვა ბოლოა დავასრულოთ ქვიზი
    if (currentQuestion + 1 < quizQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  // შექმენით ფუნქცია რომელიც განაახლებს ქვიზის სტატუსს და დასრულებს ქვიზს
  const restartQuiz = (): void => {
    setIsComplete(false);
    setCurrentQuestion(0);
    setScore(0);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md text-center'>
        {/* თუ შესრულებულია გამოჩდეს ეს  */}

        {isComplete && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Quiz Completed!</h1>
            <p className='text-lg mb-6'>
              Your Score: <span className='font-semibold'> {score}</span> /{' '}
              {quizQuestions.length}
            </p>
            <button
              onClick={restartQuiz}
              className='bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition'
            >
              Restart Quiz
            </button>
          </>
        )}

        {/* თუ ქვიზი მიმდინარეობს გამოჩნდეს ეს */}

        {!isComplete && (
          <>
            <p className='text-gray-600 mb-4'>
              Question {currentQuestion + 1} of {quizQuestions.length}
            </p>
            <h1 className='text-2xl font-bold mb-4'>
              {quizQuestions[currentQuestion].question}
            </h1>
            <div className='space-y-4'>
              {/* აქ სტატიკურად  ინდექსად 0 ელემენტის 4 კითხვა იმაპება ჩვენ გვინდა ყოველ შემდეგ კითხვაზე ახლიდან დაიმაპოს*/}
              {quizQuestions[currentQuestion].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className='block w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition'
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
