import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {  

  const cn = bem('Pagination');

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;
    const halfVisiblePages = Math.floor(visiblePages / 2);
    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    if (startPage <= 0) {
      startPage = 1;
      endPage = visiblePages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - visiblePages + 1;
      if (startPage <= 0) {
        startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      const isCurrent = number === currentPage;      
      const isEllipsis = number === '...';
      const itemClasses = cn('page', { current: isCurrent, ellipsis: isEllipsis });
      const handleClick = () => {
        if (!isEllipsis && !isCurrent) {
          onPageChange(number);
        }
      };
      return (
        <a
          key={index}
          className={itemClasses}
          onClick={handleClick}
        >
          {number}
        </a>
      );
    });
  };

  return (
    <div className={cn()}>
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;
