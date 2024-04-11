import Item from "./Item";
import { useState, useEffect } from "react";
import Loader from "./Loader";
const api = "https://d1krvzwx5oquy1.cloudfront.net/books.json";

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.filter((book) => book.volumeInfo.imageLinks);
        setBooks(filteredBooks);
        setFilteredBooks(filteredBooks);
        setLoading(false);
      });
  }, []);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterBooks(term, filterGenre, filterAuthor);
  };

  const handleGenreFilter = (event) => {
    const genre = event.target.value;
    setFilterGenre(genre);
    filterBooks(searchTerm, genre, filterAuthor);
  };

  const handleAuthorFilter = (event) => {
    const author = event.target.value;
    setFilterAuthor(author);
    filterBooks(searchTerm, filterGenre, author);
  };

  const filterBooks = (searchTerm, genre, author) => {
    let filtered = books.filter((book) => {
      const titleMatch = book.volumeInfo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const authorMatch = book.volumeInfo.authors
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const genreMatch = genre
        ? book.volumeInfo.categories.includes(genre)
        : true;
      const authorFilter = author
        ? book.volumeInfo.authors.includes(author)
        : true;
      return titleMatch && authorMatch && genreMatch && authorFilter;
    });
    setFilteredBooks(filtered);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(6);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const nPages = Math.ceil(filteredBooks.length / recordsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="container mx-auto my-8 rounded-2xl p-4">
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            placeholder="Search by title or author"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md mr-2"
          />
          <select
            value={filterGenre}
            onChange={handleGenreFilter}
            className="p-2 border border-gray-300 rounded-md mr-2"
          >
            <option value="">Filter by Genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Romance">Romance</option>
          </select>
          <select
            value={filterAuthor}
            onChange={handleAuthorFilter}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Filter by Author</option>
            <option value="Author 1">Author 1</option>
            <option value="Author 2">Author 2</option>
          </select>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {filteredBooks
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((book, index) => (
                <Item key={index} book={book.volumeInfo} />
              ))}
          </div>
        )}
      </div>

      <div className="text-center my-6">
        <div className="join">
          {[...Array(nPages)].map((_, index) => (
            <button
              key={index}
              className="join-item btn btn-square"
              onClick={() => changePage(index + 1)}
              {...(currentPage === index + 1 && {
                style: { background: "#2563EB", color: "#fff" },
              })}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
