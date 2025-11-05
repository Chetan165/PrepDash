import React, { useState } from "react";
import Header from "../Components/Header";
import InterviewCard from "../Components/InterViewCard";
import { useParams } from "react-router-dom";
import GradientButton from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Interviews = () => {
  const [Topics, setTopics] = useState([
    "Data Structures & Algorithms",
    "System Design",
    "Object Oriented Programming",
  ]);
  const [Companies, setCompanies] = useState([
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
  ]);
  const [Highlight, setHighlight] = useState(1);
  const params = useParams();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      {!params.id ? (
        <div className="m-5">
          {Companies.map((t, index) => (
            <div
              key={index}
              className="bg-gray-800/60 border border-gray-700 text-gray-200 
               px-4 py-2 rounded-xl text-sm font-medium 
               hover:bg-gray-700/70 hover:border-gray-600 
               transition-all duration-300 cursor-pointer select-none m-3 "
            >
              {<span className="text-3xl">{t}</span>}
              <div className="mt-3">
                <GradientButton onClick={() => navigate(`${t}`)}>
                  View Details
                </GradientButton>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <InterviewCard id={params.id} />
          <div>
            <div className="flex flex-row justify-start p-4 gap-5 ">
              <button
                className={`text-xl font-semibold border-b-2 ${
                  Highlight == 1 ? "border-b-blue-600" : "border-b-transparent "
                }`}
                onClick={() => setHighlight(1)}
              >
                Topics Required
              </button>
              <button
                className={`text-xl font-semibold border-b-2 ${
                  Highlight == 2 ? "border-b-blue-600" : "border-b-transparent "
                }`}
                onClick={() => setHighlight(2)}
              >
                Past Questions
              </button>
            </div>

            {Highlight == 1 ? (
              Topics.map((t, index) => (
                <div
                  key={index}
                  className="bg-gray-800/60 border border-gray-700 text-gray-200 
               px-4 py-2 rounded-xl text-sm font-medium 
               hover:bg-gray-700/70 hover:border-gray-600 
               transition-all duration-300 cursor-pointer select-none m-3"
                >
                  {t}
                </div>
              ))
            ) : (
              <div
                className="bg-gray-800/60 border border-gray-700 text-gray-200 
               px-4 py-2 rounded-xl text-sm font-medium 
               hover:bg-gray-700/70 hover:border-gray-600 
               transition-all duration-300 cursor-pointer select-none m-3"
              >
                No Questions
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Interviews;
