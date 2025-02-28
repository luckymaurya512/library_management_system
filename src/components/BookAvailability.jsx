import React, { useState, useEffect } from "react";
import booksData from "../utils/Books.json"; // Direct import since both are in the same folder

const CheckBookAvailability = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [books, setBooks] = useState([]);
  const [availability, setAvailability] = useState(null);

  useEffect(() => {
    setBooks(booksData); // Set the imported data
  }, []);

  const handleCheckAvailability = () => {
    if (!bookTitle.trim()) {
      setAvailability("Please enter a book title.");
      return;
    }

    const book = books.find(
      (b) => b.title.toLowerCase() === bookTitle.toLowerCase()
    );
    setAvailability(book ? (book.available ? "✅ Available" : "❌ Not Available") : "⚠️ Book Not Found");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-xl border border-blue-200">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📚 Check Book Availability
      </h2>
      
      <div className="mb-4">
        <label htmlFor="bookTitle" className="block text-lg font-semibold text-gray-700 mb-2">
          Enter Book Title:
        </label>
        <input
          type="text"
          id="bookTitle"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          placeholder="E.g. The Great Gatsby"
        />
      </div>

      <button
        onClick={handleCheckAvailability}
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        🔍 Check Availability
      </button>

      {availability && (
        <div className={`mt-6 p-4 text-lg font-semibold text-center rounded-lg 
          ${availability.includes("Available") ? "bg-green-100 text-green-700 border border-green-500" :
          availability.includes("Not Available") ? "bg-red-100 text-red-700 border border-red-500" :
          "bg-yellow-100 text-yellow-700 border border-yellow-500"}`}>
          {availability}
        </div>
      )}
    </div>
  );
};

export default CheckBookAvailability;
