import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: { [key: string]: string };
  correctAnswer: string;
}

const ExamDetail = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Dummy data for demonstration
  const examData = {
    title: "Mathematics Exam",
    duration: "60 minutes",
    totalQuestions: 10,
  };

  const questions: Question[] = [
    {
      id: 1,
      text: "What is 2 + 2?",
      options: {
        A: "3",
        B: "4",
        C: "5",
        D: "6",
      },
      correctAnswer: "B",
    },
    {
      id: 2,
      text: "What is the capital of France?",
      options: {
        A: "London",
        B: "Berlin",
        C: "Paris",
        D: "Madrid",
      },
      correctAnswer: "C",
    },
    // Add more questions as needed
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    alert("Exam submitted!");
    // Add submit logic here (e.g., API call)
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 p-6 shadow-md border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold">{examData.title}</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>Duration: {examData.duration}</span> |{" "}
          <span>Total Questions: {examData.totalQuestions}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 flex-grow">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          {/* Question Number */}
          <div className="text-lg font-semibold mb-4">
            Question {currentQuestion.id} of {examData.totalQuestions}
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <p className="text-lg">{currentQuestion.text}</p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-6">
            {Object.entries(currentQuestion.options).map(([key, value]) => (
              <div
                key={key}
                className={`p-3 rounded-lg border ${
                  key === currentQuestion.correctAnswer
                    ? "border-green-500 bg-green-50 dark:bg-green-900 dark:border-green-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <span className="font-medium">{key}. </span>
                <span>{value}</span>
                {key === currentQuestion.correctAnswer && (
                  <span className="ml-2 text-green-600 dark:text-green-400">
                    (Correct)
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Navigation and Submit */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="text-sm">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExamDetail;
