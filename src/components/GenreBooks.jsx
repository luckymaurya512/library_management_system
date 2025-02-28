import React from "react";
import { useParams } from "react-router-dom";
import books from "../utils/Books.json"; // Import books data

const BooksByGenre = () => {
  const { genre } = useParams(); // Get genre from the URL
  const normalizedGenre = genre?.trim().toLowerCase(); // Normalize input

  // Filter books that match the genre (case insensitive)
  const filteredBooks = books.filter(
    (book) => book.genre.trim().toLowerCase() === normalizedGenre
  );

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg shadow-lg border border-purple-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-purple-700">
        📚 Books in <span className="capitalize">{genre}</span>
      </h2>

      {filteredBooks.length === 0 ? (
        <p className="text-center text-gray-500">No books found for this genre.</p>
      ) : (
        <div className="space-y-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600">by <span className="font-medium">{book.author}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksByGenre;
