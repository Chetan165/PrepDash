import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ title, value, para1, para2 }) => {
  const navigate = useNavigate();
  return (
    <div
      className="m-6 w-72 h-36 rounded-2xl bg-gray-800/60 border border-gray-700 
                    shadow-md hover:shadow-lg hover:border-gray-600 hover:scale-105 hover:cursor-pointer
                    transition-all duration-300 p-5 flex flex-col justify-center"
      onClick={() => (para1 && para2 ? navigate(`${para1}/${para2}`) : null)}
    >
      <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </h3>
      <h1 className="text-3xl font-semibold text-gray-100">{value}</h1>
    </div>
  );
};

export default Card;
