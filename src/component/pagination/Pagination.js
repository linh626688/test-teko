import React from 'react';
import './Pagination.css'
import ReactPaginate from "react-paginate";

function Pagination({pageCount, onPageChange}) {
  return (
    <ReactPaginate
      activeClassName={'item active '}
      breakClassName={'item break-me '}
      breakLabel={'...'}
      containerClassName={'pagination'}
      disabledClassName={'disabled-page'}
      marginPagesDisplayed={2}
      nextClassName={"item next "}
      onPageChange={onPageChange}
      pageCount={pageCount}
      pageClassName={'item pagination-page '}
      pageRangeDisplayed={2}
      previousClassName={"item previous"}
    />
  );
}

export default Pagination;

