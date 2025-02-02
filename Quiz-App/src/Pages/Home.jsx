import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz App</h1>
      <p className="text-lg mb-6">Test your knowledge with exciting questions!</p>
      <button
        onClick={() => navigate("/quiz")}
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200"
      >
        Start Quiz
      </button>
    </div>
  );
}

export default Home;