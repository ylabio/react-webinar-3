import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

const PaginationPage = ({ currentPage, totalPages, onChangePage }) => {
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 3, 2);
    }
    if (startPage > 2) {
      pages.push('...');
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="pagination-page">
      <div className="pagination-page__numbers">
        {pageNumbers.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="pagination-page__ellipsis">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onChangePage(page)}
              className={`pagination-page__number ${currentPage === page ? 'active' : ''}`}
            >
              {page}
            </button>
          )
        ))}
      </div>
    </div>
  );
};

PaginationPage.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired
};

export default React.memo(PaginationPage);
