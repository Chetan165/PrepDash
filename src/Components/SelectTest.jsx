import React, { useState } from "react";
import GradientButton from "./Button";
import { useNavigate } from "react-router-dom";

const SelectTest = () => {
  const navigate = useNavigate();
  const [Companies, setCompanies] = useState([
    "Google",
    "Amazon",
    "Meta",
    "Microsoft",
  ]);
  return (
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
          <div className="flex flex-row m-2 gap-4">
            <div className="mt-3">
              <GradientButton onClick={() => navigate(`Coding/${t}`)}>
                Practice Coding Tests
              </GradientButton>
            </div>
            <div className="mt-3">
              <GradientButton onClick={() => navigate(`Aptitude/${t}`)}>
                Practice Aptitude
              </GradientButton>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectTest;
