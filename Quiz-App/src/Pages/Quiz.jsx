import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "../Components/Timer";
import ProgressBar from "../Components/ProgressBar";

const fetchQuestions = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/questions");
    
    if (!response.data.questions || !Array.isArray(response.data.questions)) {
      throw new Error("Invalid data format");
    }

    return response.data.questions;
  } catch (error) {
    console.error("Fetch error:", error.message);
    throw new Error("Failed to fetch questions");
  }
};

function Quiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const quizDuration = 15; // Time per question (in seconds)

  const { data: questions, isLoading, isError, error } = useQuery({
    queryKey: ["questions"],
    queryFn: fetchQuestions,
    retry: 2,
    staleTime: 5 * 60 * 1000,
    cacheTime: 30 * 60 * 1000,
  });

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 4);

    if (currentIndex + 1 < (questions?.length ?? 0)) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/results", {
        state: { score, total: (questions?.length ?? 0) * 4 },
      });
    }
  };

  const handleTimeout = () => {
    handleAnswer(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">Loading quiz...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            {error?.message || "Failed to load quiz questions"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>
      
      <ProgressBar currentIndex={currentIndex} totalQuestions={questions.length} />

      <div className="flex justify-between w-full max-w-md my-4">
        <p className="text-lg">Question {currentIndex + 1} of {questions.length}</p>
        <Timer duration={quizDuration} onTimeout={handleTimeout} currentIndex={currentIndex} />
      </div>

      <h2 className="text-xl font-semibold mb-6">{questions[currentIndex]?.description}</h2>

      <div className="w-full max-w-md">
        {questions[currentIndex]?.options?.map((option, idx) => (
          <button
            key={option.id || idx}
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-2 transition-colors"
            onClick={() => handleAnswer(option.is_correct)}
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
