import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import Search from "./Search";
import { UserContext } from "../../context/UserContext";
import axios from "axios";

export default function Navbar({
  searchTerm,
  setSearchTerm,
  sortCriteria,
  setSortCriteria,
  showSearchInput,
}) {
  const { user, setUser } = useContext(UserContext);
  const handleLogout = async () => {
    try {
      const res = await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      Navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <nav class="d-flex navbar navbar-expand-lg navbar-light bg-light pt-3">
          <div class="container ">
            <div className="row d-md-flex justify-content-center w-100 items-center">
              <Link
                to={`/Booklisting`}
                className="navbar-brand col-md-3"
                href="#"
              >
                BookNest
              </Link>
              {showSearchInput && (
                <div className="d-md-flex col-md-6 justify-content-center items-center ">
                  <Search
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                  <div className="col-md-6 d-flex items-center justify-center mt-3 mt-md-0">
                    <label
                      htmlFor="sortCriteria"
                      className="form-label whitespace-nowrap "
                    >
                      Sort By:
                    </label>
                    <select
                      id="sortCriteria"
                      className="form-select ms-3 w-44"
                      value={sortCriteria}
                      onChange={(e) => setSortCriteria(e.target.value)}
                    >
                      <option value="title">Title</option>
                      <option value="author">Author</option>
                      <option value="rating">Average Rating</option>
                    </select>
                  </div>
                </div>
              )}

              <h3
                onClick={handleLogout}
                className="text-black text-sm hover:text-gray-500 cursor-pointer col-md-1 col-4 ms-md-5 mt-3 h-9 pt-1 pt-md-0 mt-md-0 bg-white border-2 d-md-flex justify-center align-items-center"
              >
                Logout
              </h3>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
