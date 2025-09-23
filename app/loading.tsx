"use client";

import React from "react";

const LoaderPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black transition-colors">
      <div className="relative flex items-center justify-center">
        {/* Spinning gradient ring */}
        <div
          className="absolute w-44 h-44 rounded-full border-4 border-transparent animate-spin 
            bg-gradient-to-tr from-[#57ff9e] via-[#00bfff] to-[#57ff9e] 
            dark:from-[#57ff9e] dark:via-[#00f2fe] dark:to-[#57ff9e]
            [mask-image:radial-gradient(closest-side,transparent_80%,black)]"
        />

        {/* Glowing background circle */}
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center animate-pulse
            bg-gray-100 shadow-[0_0_15px_#57ff9e,0_0_25px_#00bfff]
            dark:bg-gray-900 dark:shadow-[0_0_30px_#57ff9e,0_0_60px_#00f2fe]"
        >
          {/* Logo */}
          <img
            src="/images/loader-logo.svg"
            alt="Loading Logo"
            className="w-20 drop-shadow-[0_0_8px_#57ff9e] dark:drop-shadow-[0_0_15px_#57ff9e]"
          />
        </div>
      </div>
    </div>
  );
};

export default LoaderPage;
