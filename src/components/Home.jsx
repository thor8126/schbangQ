import Item from "./Item";
import { useState, useEffect } from "react";
import Loader from "./Loader";
const api = "https://d1krvzwx5oquy1.cloudfront.net/books.json";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        const filteredBooks = data.filter((book) => book.volumeInfo.imageLinks);
        setBooks(filteredBooks);
        setLoading(false);
      });

    // remove books with no imageLinks
  }, []);

  return (
    <>
      <div className="container mx-auto my-8  rounded-2xl p-4">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Item key={index} book={book.volumeInfo} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
