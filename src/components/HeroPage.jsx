import React from "react";
import { Link } from "react-router-dom";

const HeroPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 relative">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative text-white text-center p-10">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-10">
          Library Management System
        </h1>

        <div className="space-y-5">
          <h3 className="py-3 px-5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition">
            <Link to="/book-availability" className="text-2xl font-medium">
              📖 Book Availability
            </Link>
          </h3>

          <h3 className="py-3 px-5 rounded-lg bg-gradient-to-r from-green-400 to-teal-500 hover:from-teal-500 hover:to-green-400 transition">
            <Link to="/issue-book" className="text-2xl font-medium">
              📚 Issue Book
            </Link>
          </h3>

          <h3 className="py-3 px-5 rounded-lg bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-400 transition">
            <Link to="/return-book" className="text-2xl font-medium">
              🔄 Return Book
            </Link>
          </h3>

          <h3 className="py-3 px-5 rounded-lg bg-gradient-to-r from-blue-400 to-indigo-500 hover:from-indigo-500 hover:to-blue-400 transition">
            <Link to="/genres" className="text-2xl font-medium">
              🎭 Book Genre
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
