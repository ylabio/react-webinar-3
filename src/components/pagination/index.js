import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ currentPage, totalPages, onPageChange, displayPages = 3 }) {
  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
  let endPage = startPage + displayPages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - displayPages + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <ul className="Pagination">
      {startPage > 1 && (
        <>
          <li className="Pagination-item">
            <button className="Pagination-link" onClick={() => onPageChange(1)}>
              1
            </button>
          </li>
          {startPage > 2 && (
            <li className="Pagination-item disabled">
              <span className="Pagination-link">...</span>
            </li>
          )}
        </>
      )}

      {pages.map(page => (
        <li key={page} className={`Pagination-item ${currentPage === page ? 'active' : ''}`}>
          <button className="Pagination-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <li className="Pagination-item disabled">
              <span className="Pagination-link">...</span>
            </li>
          )}
          <li className="Pagination-item">
            <button className="Pagination-link" onClick={() => onPageChange(totalPages)}>
              {totalPages}
            </button>
          </li>
        </>
      )}
    </ul>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  displayPages: PropTypes.number,
};

export default memo(Pagination);
