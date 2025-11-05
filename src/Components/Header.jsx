import React from "react";
import { FiSearch, FiUser } from "react-icons/fi";
const Header = () => {
  return (
    <div
      className="mt-1  mx-6 max-w-screen-2xl h-15 rounded-2xl
                    shadow-md hover:shadow-l
                    transition-all duration-300 p-5 flex flex-row justify-evenly border-b border-s-white "
    >
      <h1 className="text-5xl text-gray-500 font-bold ">PrepDash</h1>
      <div className="flex flex-row ">
        <input
          className=" m-1 max-w-screen-sm h-10 rounded-2xl bg-gray-800/60 border border-gray-700 
                    shadow-md hover:shadow-l
                    transition-all duration-300 p-5"
          placeholder="Search.."
        ></input>
        <FiSearch className="text-2xl mt-3 hover:scale-105 hover:cursor-pointer" />
      </div>
      <div className="mt-3 text-2xl hover:scale-105 hover:cursor-pointer">
        <FiUser />
      </div>
    </div>
  );
};

export default Header;
