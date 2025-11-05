import React, { useState, useEffect } from "react";
import { FiFlag } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Aptitude() {
  // Question data stored in useState
  const [questions] = useState([
    {
      id: 1,
      question:
        "What is the time complexity of a binary search algorithm on a sorted array of size 'n'?",
      options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
      answer: 2, // index of correct option (for future scoring)
    },
    {
      id: 2,
      question: "Which data structure uses FIFO principle?",
      options: ["Stack", "Queue", "Tree", "Graph"],
      answer: 1,
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Colorful Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Creative Styling System",
      ],
      answer: 1,
    },
  ]);

  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState({});
  const [flagged, setFlagged] = useState([]);
  const [time, setTime] = useState(5400); // 1.5 hours in seconds

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((v) => String(v).padStart(2, "0"));
  };

  const handleSelect = (optIndex) => {
    setSelected({ ...selected, [currentQ]: optIndex });
  };

  const toggleFlag = () => {
    if (flagged.includes(currentQ))
      setFlagged(flagged.filter((i) => i !== currentQ));
    else setFlagged([...flagged, currentQ]);
  };

  const [h, m, s] = formatTime(time);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Left Section: Question Numbers */}
      <div className="w-1/5 bg-gray-900/80 p-6 border-r border-gray-800 flex flex-col justify-between rounded-r-2xl">
        <div>
          <h2 className="font-semibold mb-4">Questions</h2>
          <div className="grid grid-cols-4 gap-3">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQ(index)}
                className={`w-10 h-10 flex items-center justify-center rounded-md text-sm font-medium border transition-all
                ${
                  currentQ === index
                    ? "bg-blue-600 border-blue-500"
                    : selected[index] !== undefined
                    ? "bg-green-700 border-green-600"
                    : "bg-gray-800 border-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-gray-400 mt-6 space-y-1">
          <div>
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-sm mr-2"></span>
            Current
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-green-700 rounded-sm mr-2"></span>
            Answered
          </div>
          <div>
            <span className="inline-block w-3 h-3 bg-gray-700 rounded-sm mr-2"></span>
            Not Answered
          </div>
        </div>
      </div>

      {/* Center Section: Question & Options */}
      <div className="flex-1 p-10 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Question {currentQ + 1} of {questions.length}
          </h2>
          <p className="text-gray-300 mb-6">{questions[currentQ].question}</p>

          <div className="space-y-3">
            {questions[currentQ].options.map((opt, index) => (
              <label
                key={index}
                className={`block p-4 rounded-xl border cursor-pointer transition-all
                  ${
                    selected[currentQ] === index
                      ? "bg-blue-800/50 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                  }`}
              >
                <input
                  type="radio"
                  name={`q-${currentQ}`}
                  checked={selected[currentQ] === index}
                  onChange={() => handleSelect(index)}
                  className="hidden"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-800">
          <button
            onClick={() => setCurrentQ((prev) => (prev > 0 ? prev - 1 : prev))}
            disabled={currentQ === 0}
            className="flex items-center gap-2 bg-gray-800 px-5 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition disabled:opacity-50"
          >
            <FaArrowLeft /> Previous
          </button>

          <div className="flex gap-4">
            <button
              onClick={toggleFlag}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg border transition ${
                flagged.includes(currentQ)
                  ? "border-yellow-400 text-yellow-400"
                  : "border-gray-700 text-gray-300 hover:border-gray-500"
              }`}
            >
              <FiFlag /> Flag for Review
            </button>

            <button
              onClick={() =>
                setCurrentQ((prev) =>
                  prev < questions.length - 1 ? prev + 1 : prev
                )
              }
              disabled={currentQ === questions.length - 1}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 px-5 py-2 rounded-lg font-semibold hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition disabled:opacity-50"
            >
              Next <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      {/* Right Section: Timer & Controls */}
      <div className="w-1/5 bg-gray-900/80 p-6 border-l border-gray-800 rounded-l-2xl flex flex-col justify-between">
        <div>
          <h3 className="font-semibold mb-4">Time Remaining</h3>
          <div className="flex justify-between mb-6">
            <div className="text-center">
              <p className="text-2xl font-semibold">{h}</p>
              <p className="text-xs text-gray-400">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{m}</p>
              <p className="text-xs text-gray-400">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold">{s}</p>
              <p className="text-xs text-gray-400">Seconds</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">
              Progress ({Object.keys(selected).length}/{questions.length})
            </p>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{
                  width: `${
                    (Object.keys(selected).length / questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => alert("Test Submitted!")}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-[0_0_12px_rgba(244,114,182,0.4)] text-white font-semibold py-2 rounded-lg transition"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
