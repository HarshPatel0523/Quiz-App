import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Timer from "../Components/Timer";
import ProgressBar from "../Components/ProgressBar";
import QuestionCard from "../Components/QuestionCard";
import { motion } from "framer-motion";

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
  const quizDuration = 15;

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-t-4 border-gray-400 rounded-full animate-spin"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className="text-center p-8 rounded-xl shadow-lg bg-gray-700">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <p className="text-red-500 text-xl mb-4 font-medium">
              {error?.message || "Failed to load quiz questions"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg"
            >
              Try Again
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <p className="text-white text-xl font-medium">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4 flex justify-center items-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Quiz Challenge</h1>
            <p className="text-gray-400">Test your knowledge and earn points!</p>
          </div>

          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <ProgressBar currentIndex={currentIndex} totalQuestions={questions.length} />
            <div className="flex justify-between items-center mt-4">
              <div className="text-white">
                Score: <span className="font-bold text-blue-400">{score}</span>
              </div>
              <Timer duration={quizDuration} onTimeout={handleTimeout} currentIndex={currentIndex} />
            </div>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-700 p-6 rounded-lg shadow-md"
          >
            <QuestionCard
              question={questions[currentIndex]}
              onAnswer={handleAnswer}
              currentIndex={currentIndex}
              totalQuestions={questions.length}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default Quiz;