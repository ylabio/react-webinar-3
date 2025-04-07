import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ currentPage = 1, totalPages = 1, onPageChange = () => {} }) {
  const cnPagination = bem('Pagination');

  const getPages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage === 1) {
        pages.push(1, 2, 3, 'next', totalPages);
      } else if (currentPage === 2) {
        pages.push(1, 2, 3, 'next', totalPages);
      } else if (currentPage === 3) {
        pages.push(1, 2, 3, 4, 'next', totalPages);
      } else if (currentPage < totalPages - 2) {
        pages.push(1, 'prev', currentPage - 1, currentPage, currentPage + 1, 'next', totalPages);
      } else if (currentPage === totalPages - 2) {
        pages.push(1, 'prev', currentPage - 1, currentPage, currentPage + 1, totalPages);
      } else if (currentPage === totalPages - 1) {
        pages.push(1, 'prev', currentPage - 1, currentPage, totalPages);
      } else if (currentPage === totalPages) {
        pages.push(1, 'prev', totalPages - 2, totalPages - 1, totalPages);
      }
    }

    return pages;
  };

  const pages = getPages();

  const handleEllipsisClick = (type) => {
    if (type === 'prev') {
      const newPage = Math.max(currentPage - 3, 1);
      onPageChange(newPage);
    } else if (type === 'next') {
      const newPage = Math.min(currentPage + 3, totalPages);
      onPageChange(newPage);
    }
  };

  return (
    <div className={cnPagination()}>
      {pages.map((page, index) => {
        if (page === 'prev' || page === 'next') {
          return (
            <button
              key={index}
              className={cnPagination('ellipsis')}
              onClick={() => handleEllipsisClick(page)}
            >
              ...
            </button>
          );
        } else {
          return (
            <button
              key={index}
              className={cnPagination('page', { active: currentPage === page })}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        }
      })}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default memo(Pagination);
