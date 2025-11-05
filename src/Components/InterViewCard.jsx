import React from "react";
import GradientButton from "./Button";

const InterviewCard = ({ title, value, id }) => {
  const ImgData = {
    Google:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png",
    Microsoft:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png",
    Meta: "https://i.pinimg.com/736x/4b/0b/ac/4b0bacadee2847ccf95730127a1c8cb0.jpg",
    Amazon:
      "https://thumbs.dreamstime.com/b/amazon-logo-white-background-montreal-canada-july-printed-paper-98221126.jpg",
  };
  return (
    <div
      className="m-6 w-100 h-fit rounded-2xl bg-gray-800/60 border border-gray-700 
                    shadow-md hover:shadow-lg hover:border-gray-600 hover:scale-105 hover:cursor-pointer
                    transition-all duration-300 p-5 flex flex-col justify-center"
    >
      <img className="p-2 w-20 h-30" src={`${ImgData[id]}`}></img>
      <h2 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        Interview On: 24th November
      </h2>
      <h2 className="text-sm text-gray-400 uppercase tracking-wide mb-2">
        Position: {id} -SDE1
      </h2>
      <h1 className="text-3xl font-semibold text-gray-100">Package:$500k</h1>
      <div className="mt-5">
        <GradientButton>Practice Mock</GradientButton>
      </div>
    </div>
  );
};

export default InterviewCard;
