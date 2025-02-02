import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Home, RotateCcw, Share2, Award } from "lucide-react";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 1 };
  const percentage = (score / total) * 100;

  const getGradeColor = (percent) => {
    if (percent >= 80) return "text-green-400";
    if (percent >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getFeedback = (percent) => {
    if (percent >= 80) return "Excellent work! You're a master!";
    if (percent >= 60) return "Good job! Keep practicing!";
    return "Keep learning! You'll do better next time!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-xl"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full mix-blend-overlay filter blur-xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-xl"
        >
          {/* Trophy Icon */}
          <motion.div initial={{ y: -50 }} animate={{ y: 0 }} className="flex justify-center mb-6">
            <Trophy className="w-20 h-20 text-amber-400" />
          </motion.div>

          {/* Results Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-white mb-2"
            >
              Quiz Completed!
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-300"
            >
              {getFeedback(percentage)}
            </motion.p>
          </div>

          {/* Score Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl p-6 mb-8"
          >
            <div className="text-center">
              <p className="text-gray-300 mb-2">Your Score</p>
              <h2 className={`text-5xl font-extrabold mb-2 ${getGradeColor(percentage)} drop-shadow-lg`}>
                {score}/{total}
              </h2>
              <p className="text-gray-300">{percentage.toFixed(1)}% Correct</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-lg p-4 text-center"
            >
              <Award className="w-6 h-6 mx-auto mb-2 text-sky-400" />
              <p className="text-sm text-gray-300">Questions</p>
              <p className="text-xl font-bold text-white">{total}</p>
            </motion.div>
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 rounded-lg p-4 text-center"
            >
              <Trophy className="w-6 h-6 mx-auto mb-2 text-amber-400" />
              <p className="text-sm text-gray-300">Points</p>
              <p className="text-xl font-bold text-white">{score}</p>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center gap-2 bg-gray-700 text-white 
                         py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-600 
                         transition-all duration-200"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/quiz")}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white 
                         py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-emerald-700 
                         transition-all duration-200"
            >
              <RotateCcw className="w-5 h-5" />
              Play Again
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white 
                         py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-gray-700 
                         transition-all duration-200"
            >
              <Share2 className="w-5 h-5" />
              Share Score
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Results;