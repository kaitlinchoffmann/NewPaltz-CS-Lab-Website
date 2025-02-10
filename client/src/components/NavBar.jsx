import React from "react";

const NavBar = () => {
  return (
    <nav className="flex-row items-center justify-between bg-neutral-100 px-6 py-3 border border-purple-400">
      {/* CS Lab Logo - Positioned to the left */}
      <div className="w-1 h-2=1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          className="w-1 h-11"
        >
          {/* Circle background */}
          <circle cx="50" cy="50" r="48" fill="#67E8F9" stroke="black" strokeWidth="2" />
          {/* Text inside the logo */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy=".3em"
            fontSize="12"
            fontWeight="bold"
            fill="black"
          >
            CS Lab
          </text>
        </svg>
      </div>

      {/* Navigation Bar - Centered */}
      <div className="bg-gray-300 text-black font-medium px-8 py-3 rounded-full">
        navigation bar
      </div>

      {/* Admin Login Button - Positioned to the right */}
      <button className="bg-orange-400 text-black font-medium px-6 py-2 rounded-full">
        admin login
      </button>
    </nav>
  );
};

export default NavBar;
