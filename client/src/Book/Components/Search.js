import React from "react";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="d-flex align-items-center position-relative me-5 col-6 ">
      <i class="bi bi-search fs-5 position-absolute ms-3 "></i>
      <input
        type="text"
        data-kt-user-table-filter="search"
        className="form-control form-control-solid w-250px ps-14"
        placeholder="Search by title, author, or genre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
