import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function Timer({ duration, onTimeout, currentIndex }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout(); // Auto-move to next question
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, duration, onTimeout]);

  return (
    <div className="text-lg font-semibold bg-gray-800 text-white px-4 py-2 rounded-lg">
      ⏳ Time Left: {timeLeft}s
    </div>
  );
}

export default Timer;
