import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function PaginationButton({ page, isActive, onPageChange }) {
  return (
    <button
      className={isActive ? 'pagination-button active' : 'pagination-button'}
      onClick={() => typeof page === 'number' && onPageChange(page)}
      disabled={typeof page !== 'number'}
    >
      {page}
    </button>
  );
}

PaginationButton.propTypes = {
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationButton;
