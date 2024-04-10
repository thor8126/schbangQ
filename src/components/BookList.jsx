import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import Pagination from "./Pagination";

const BookList = () => {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  useEffect(() => {
    fetch("https://d1krvzwx5oquy1.cloudfront.net/books.json")
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Get current books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="book-list">
      <h2 className="text-2xl font-semibold mb-4">Book List</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {book.volumeInfo.title}
                </h3>
                <p className="text-gray-600">
                  Author: {book.volumeInfo.authors.join(", ")}
                </p>
                <p className="text-gray-600">
                  Rating: {book.volumeInfo.averageRating}
                </p>
                <p className="text-gray-600 description">
                  Description: {book.volumeInfo.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        totalBooks={books.length}
        booksPerPage={booksPerPage}
        paginate={paginate}
      />
    </div>
  );
};

export default BookList;
