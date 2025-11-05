import React from "react";

const Card_b = ({ imgurl, title, value, date }) => {
  return (
    <div
      className="m-6 w-40 h-fit rounded-2xl bg-gray-800/60 border border-gray-700 
                    shadow-md hover:shadow-lg hover:border-gray-600 hover:scale-105 hover:cursor-pointer
                    transition-all duration-300 p-5 flex flex-col justify-center gap-3 "
    >
      <img src={imgurl} className="h-20 w-screen rounded-lg scale-125"></img>
      <h3 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        {title}
      </h3>
      <h1 className="text-3xl font-semibold text-gray-100">{value}</h1>
      <h1 className="text-3xl font-semibold text-gray-100">{date}</h1>
    </div>
  );
};

export default Card_b;
