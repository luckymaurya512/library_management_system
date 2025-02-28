import React from "react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 relative">
      {/* Glass Effect Container */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-lg border border-gray-400 border-opacity-30 rounded-2xl shadow-lg p-10 w-[40%] text-center">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-8">
          Library Management System
        </h1>

        <div className="space-y-4">
          {[
            { to: "/book-availability", text: "📖 Book Availability", color: "from-yellow-400 to-orange-500" },
            { to: "/issue-book", text: "📚 Issue Book", color: "from-green-400 to-teal-500" },
            { to: "/return-book", text: "🔄 Return Book", color: "from-red-400 to-pink-500" },
            { to: "/genres", text: "🎭 Book Genre", color: "from-blue-400 to-indigo-500" }
          ].map(({ to, text, color }, index) => (
            <h3 key={index} className={`py-3 px-6 rounded-lg bg-gradient-to-r ${color} hover:scale-105 transform transition duration-300 shadow-md`}>
              <Link to={to} className="text-2xl font-medium text-white">
                {text}
              </Link>
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
