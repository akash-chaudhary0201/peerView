"use client";
import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import Cookies from "js-cookie";

const HomeMain = () => {
  useEffect(() => {
    const token = Cookies.get("token");
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center  relative p-[200px]">
        <div className="bg-white h-[200px] w-[200px] absolute blur-[150px]"></div>
        <div className="bg-orange-500 h-[200px] w-[200px] absolute blur-[800px]"></div>
        <div className="text-center z-10">
          <div>
            <h1 className=" font-bold text-[65px]">
              Empower Your <span className="text-blue-700">Academic</span>{" "}
              Journey!
            </h1>
            <h2 className="text-[40px] text-orange-600 font-bold">
              Your skills, your story, your future – all in one place
            </h2>
            <p className="mt-2">
              A Platform for Students and Teachers to Connect, Share, and Grow.
              "Seamlessly showcase your achievements, skills, and experiences.
              Explore opportunities, collaborate, and prepare for placements
              with ease."
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMain;
