/* eslint-disable react/prop-types */
import { motion } from 'framer-motion';

const QuestionCard = ({ question, onAnswer, currentIndex, totalQuestions }) => {
  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
      <div className="space-y-6">
        {/* Question Header */}
        <div className="flex items-center justify-between">
          <span className="px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-medium">
            Question {currentIndex + 1}/{totalQuestions}
          </span>
          <span className="text-blue-400 font-medium">
            Points: 4
          </span>
        </div>

        {/* Question Text */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-white leading-tight">
            {question.description}
          </h3>
        </div>

        {/* Options */}
        <div className="grid gap-4 mt-6">
          {question.options?.map((option, idx) => (
            <motion.button
              key={option.id || idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-left px-6 py-4 rounded-lg bg-gray-700 hover:bg-gray-600 
                         transition-colors duration-200 text-white font-medium
                         border-2 border-transparent hover:border-blue-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={() => onAnswer(option.is_correct)}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-600 mr-4">
                  {String.fromCharCode(65 + idx)}
                </span>
                {option.description}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;