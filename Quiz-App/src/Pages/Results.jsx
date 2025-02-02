import { useLocation, useNavigate } from "react-router-dom";

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 1 };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-500 text-white">
      <h1 className="text-3xl font-bold">Quiz Completed!</h1>
      <p className="text-lg mt-4">Your Score: {score} / {total}</p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200"
      >
        Play Again
      </button>
    </div>
  );
}

export default Results;