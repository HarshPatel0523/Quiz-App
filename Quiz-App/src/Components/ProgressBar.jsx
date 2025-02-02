// eslint-disable-next-line react/prop-types
function ProgressBar({ currentIndex, totalQuestions }) {
    const progress = ((currentIndex + 1) / totalQuestions) * 100;
  
    return (
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  }
  
  export default ProgressBar;
  