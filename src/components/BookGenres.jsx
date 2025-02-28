import React from 'react';
import { Link } from 'react-router-dom';
import books from '../utils/Books.json'; // Import JSON directly

const BookGenres = () => {
  // Extract unique genres, case-insensitive
  const genres = [...new Set(books.map(book => book.genre.trim().toLowerCase()))];

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl shadow-lg border border-blue-300">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        📚 Book Genres
      </h2>

      <ul className="space-y-3">
        {genres.map((genre, index) => (
          <li key={index} className="text-lg font-semibold text-gray-700">
            <Link
              to={`/genre/${genre}`}
              className="flex items-center px-4 py-2 bg-white rounded-lg shadow hover:bg-blue-200 transition duration-300"
            >
              📖 {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookGenres;
