import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pagesToShow = 3;
  const half = Math.floor(pagesToShow / 2);

  const startPage = Math.max(1, currentPage - half);
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="Pagination">
      <ul className="Pagination-list">
        {startPage > 1 && (
          <li key="first" className="Pagination-item">
            <button onClick={() => onPageChange(1)}>1</button>
          </li>
        )}

        {startPage > 2 && (
          <li key="dots-start" className="Pagination-item dots">
            <span>...</span>
          </li>
        )}

        {pages.map(page => (
          <li key={page} className={`Pagination-item ${currentPage === page ? 'active' : ''}`}>
            <button onClick={() => onPageChange(page)}>{page}</button>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li key="dots-end" className="Pagination-item dots">
            <span>...</span>
          </li>
        )}

        {endPage < totalPages && (
          <li key="last" className="Pagination-item">
            <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
