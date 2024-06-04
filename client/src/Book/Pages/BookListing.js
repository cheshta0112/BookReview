import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import Search from "../Components/Search";
import { getAllBooks } from "../Core/_request";
import Navbar from "../Components/Navbar";

export default function BookListing() {
  const [books, setBooks] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("title");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooks();
        console.log("book", response);
        setBooks(response);
        console.log("book", books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (searchTerm) {
        const response = await fetch(
          `http://localhost:5000/book/search?query=${searchTerm}`
        );
        console.log("response", response);
        const result = await response.json();

        setBooks(result);
      } else {
        setBooks(books);
      }
    };

    fetchBooks();
  }, [searchTerm]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  // const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const sortedBooks = [...books].sort((a, b) => {
    if (sortCriteria === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortCriteria === "author") {
      return a.author.localeCompare(b.author);
    } else if (sortCriteria === "rating") {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  const currentBooks = sortedBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        showSearchInput={true}
      />

      <div className="row mt-5 px-4 pt-5 gap-4 bg-light justify-content-center pb-5">
        {currentBooks.map((book) => (
          <Link
            to={`/book/${book._id}`}
            key={book._id}
            className="col-md-5 col-xl-3 card text-decoration-none text-dark"
          >
            <div className=" d-flex justify-center  items-center">
              <img
                src={book.coverImageUrl}
                className="card-img-top h-3/4 w-3/4 mb-0"
                alt="img"
              />
            </div>

            <div className="my-3">
              <div className="fs-3 fw-bold text-dark ">{book.title}</div>
              <p className="text-gray-400 fw-semibold fs-5 mt-1 ">
                {book.author}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Pagination
        booksPerPage={booksPerPage}
        totalBooks={books.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
