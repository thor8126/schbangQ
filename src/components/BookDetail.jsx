import React from "react";

const BookDetail = ({ book }) => {
  return (
    <div className="book-detail bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-semibold mb-4">{book.volumeInfo.title}</h2>
      <img
        src={book.volumeInfo.imageLinks.thumbnail}
        alt={book.volumeInfo.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-lg font-semibold mb-2">
        Authors: {book.volumeInfo.authors.join(", ")}
      </p>
      <p className="text-gray-600">Publisher: {book.volumeInfo.publisher}</p>
      <p className="text-gray-600">
        Published Date: {book.volumeInfo.publishedDate}
      </p>
      <p className="text-gray-600">Rating: {book.volumeInfo.averageRating}</p>
      <p className="text-gray-600">Page Count: {book.volumeInfo.pageCount}</p>
      <p className="text-gray-600">
        Description: {book.volumeInfo.description}
      </p>
      <a
        href={book.volumeInfo.previewLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline"
      >
        Preview Link
      </a>
    </div>
  );
};

export default BookDetail;
