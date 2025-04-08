import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import ItemsOnPage from '../items-on-page';
import PaginationButton from '../pagination-button';

function Pagination({ page, totalPages, onPageChange, limit, onLimitChange }) {
  // const getPages = () => {
  //   const pages = [1]; // всегда 1 страница
  //   if (page > 3) pages.push('...'); // "..." перед текущей страницей
  //   if (page > 2) pages.push(page - 1); // перед страницей
  //   if (page !== 1 && page !== totalPages) pages.push(page); // эта страница
  //   if (page < totalPages - 1) pages.push(page + 1); // след. страница
  //   if (page < totalPages - 2) pages.push('...'); // "..." после страницы
  //   pages.push(totalPages); // всегда последняя

  //   return pages;
  // };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
        pages.push(i);
      }
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <ItemsOnPage limit={limit} onLimitChange={onLimitChange} />
      <div className="pagination">
        {getPages().map((p, index) => (
          <PaginationButton
            key={index}
            page={p}
            isActive={p === page}
            onPageChange={onPageChange}
          />
        ))}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  limit: PropTypes.number.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default Pagination;
