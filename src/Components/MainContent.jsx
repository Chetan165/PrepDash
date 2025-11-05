import React from "react";
import Card from "./Card";
import Header from "./Header";
import Card_b from "./Card_b";
import GradientButton from "./Button";
const MainContent = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-row justify-evenly">
        <Card title={`Upcoming Interviews`} value={5} />
        <Card title={"Upcoming Mock"} value={`15th November,2025`} />
        <Card title={"Latest Score"} value={`86%`} />
      </div>
      <div className="flex flex-row items-center justify-start border-b-2 border-b-white-900 pb-5">
        <h1 className="text-gray-600 text-3xl font-semibold mt-5">
          My Interviews
        </h1>
        <span className="mt-6 mx-4 flex flex-row justify-center items-center">
          <GradientButton children={"+ Add Interview"} />
        </span>
      </div>
      <div className="flex flex-row justify-start">
        <Card_b
          title={"Software Engineer"}
          value={"Google"}
          imgurl={
            "https://getwallpapers.com/wallpaper/full/6/a/8/1325547-most-popular-solid-wallpaper-colors-1920x1200.jpg"
          }
        />
        <Card_b
          title={"Product Manager"}
          value={"Microsoft"}
          imgurl={
            "https://r1.ilikewallpaper.net/iphone-wallpapers/download/33601/Abstract-Neon-Light-Colors-Gradation-Blur-iphone-wallpaper-ilikewallpaper_com.jpg"
          }
        />
      </div>
    </div>
  );
};

export default MainContent;
