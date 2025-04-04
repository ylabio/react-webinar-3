import React, { memo } from 'react';
import './style.css'

const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange = page => {}, options = [], limit = 10, onLimitChange = limit => {} }) => {
  const getPagination = () => {
    let pages = [];

    if (totalPages <= 7) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      if (currentPage <= 3) {
        pages = [1, 2, 3, 4, "...", totalPages];
      } else if (currentPage >= totalPages - 2) {
        pages = [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        pages = [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
      }
    }
    return pages;
  };

  return (
    <ul className="pagination-container">
      <div className="custom-select-wrapper">
        <select
          className="pagination-select"
          value={limit}
          onChange={event => {
            onLimitChange(event.target.value);
            onPageChange(1);
          }}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {getPagination().map((page, index) => (
        <li
          key={index}
          className={`${page === currentPage ? 'selected' : ''} ${page === '...' ? 'dots' : ''}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
        >
          {page}
        </li>
      ))}
    </ul>
  );
};

export default memo(Pagination);
