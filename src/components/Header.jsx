import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import userIcon from "../assets/user-icon.png";
import userIconBlue from "../assets/user-icon-blue.png";

const Header = () => {
  const user = useSelector((store) => store.user);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const userIconRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userIconRef.current &&
        !userIconRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  return (
    <div className="z-20 bg-black px-8 py-3 flex justify-between items-center shadow-md">
      {/* Left Side - Logo */}
      <h1 className="text-xl font-bold text-white">📚 Library</h1>

      {/* Right Side - User Icon & Dropdown */}
      {user && (
        <div className="relative" ref={userIconRef}>
          <img
            className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-300 hover:border-white transition"
            src={userIcon}
            alt="User Icon"
            onClick={() => setDropdownVisible(!isDropdownVisible)}
          />
          {isDropdownVisible && (
            <div
              className="absolute right-0 mt-2 w-52 bg-gray-900 text-white rounded-lg shadow-lg z-50 border border-gray-700"
              ref={dropdownRef}
            >
              <div className="p-3 flex items-center space-x-3 border-b border-gray-700">
                <img className="h-8 w-8 rounded-full" src={userIconBlue} alt="User Icon" />
                <span className="text-sm font-medium truncate">sandeepyadav5...</span>
              </div>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-800 transition"
                onClick={handleSignOut}
              >
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
