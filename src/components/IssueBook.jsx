import React, { useState } from 'react';

const IssueBook = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [memberId, setMemberId] = useState('');
  const [message, setMessage] = useState('');

  const handleIssueBook = () => {
    if (bookTitle.trim() && memberId.trim()) {
      setMessage(`📖 Book "${bookTitle}" has been issued to Member ID: ${memberId}`);
    } else {
      setMessage('⚠️ Please fill in both the book title and member ID.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-xl shadow-lg border border-green-200">
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        📚 Issue a Book
      </h2>

      <div className="mb-4">
        <label htmlFor="bookTitle" className="block text-lg font-semibold text-gray-700 mb-2">
          Book Title:
        </label>
        <input
          type="text"
          id="bookTitle"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="E.g. The Great Gatsby"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="memberId" className="block text-lg font-semibold text-gray-700 mb-2">
          Member ID:
        </label>
        <input
          type="text"
          id="memberId"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
          placeholder="Enter Member ID"
        />
      </div>

      <button
        onClick={handleIssueBook}
        className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-300"
      >
        📖 Issue Book
      </button>

      {message && (
        <div className={`mt-6 p-4 text-lg font-semibold text-center rounded-lg border 
          ${message.includes('issued') ? "bg-blue-100 text-blue-700 border-blue-500" : 
          "bg-yellow-100 text-yellow-700 border-yellow-500"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default IssueBook;
