import React from "react";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="d-flex align-items-center position-relative me-md-5  col-md-6 ms-2 ms-md-0">
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
