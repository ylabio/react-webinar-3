import React from 'react';
import PropTypes from 'prop-types';
import { getPagination } from '../../utils';
import "./style.css";

function Pagination({ activePage = 1, totalPages = 1, onChange }) {
  const pagination = getPagination(activePage, totalPages);

  const handlePageChange = (page) => {
    onChange(page);
  };

  return (
    <div className="Pagination">
      {pagination.map((page, i) => (
        <button
          key={i}
          className={`PaginationPage ${page === activePage ? "PaginationPageActive" : ""}`}
          disabled={page === "..."}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  activePage: PropTypes.number,
  totalPages: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default Pagination;