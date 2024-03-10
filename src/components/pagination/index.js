import React, { memo } from 'react';
import PropTypes from "prop-types";
import { generatePages } from '../../utils';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPages = () => {
    const pages = generatePages(currentPage, totalPages);
    return pages.map((page, index) => {
      if (page === '...') {
        return <span key={index} className="Pagination-dots">...</span>;
      }
      return (
        <button
          key={index}
          onClick={() => onPageChange(page)}
          className={`Pagination-btn ${currentPage === page ? 'Pagination-btn-active' : ''}`}
        >
          {page}
        </button>
      );
    });
  };

  return (
    <div className="Pagination">
      {renderPages()}
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default memo(Pagination);
