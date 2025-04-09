import React, { useState, useEffect } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

const Pagination = ({ current = 1, perPage = 10, total = 10, setPage = () => {}}) => {
  const [currentPage, setCurrentPage] = useState(current);

  const cn = bem('Pagination');

  const totalPages = Math.ceil(total / perPage);
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  const fetchItems = () => {
    console.log({
      limit: perPage,
      skip: (currentPage - 1) * perPage,
    });
  };

  // Функция для генерации номеров страниц
  const getPageNumbers = () => {
    const pageNumbers = [];

    pageNumbers.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 3) {
      endPage = Math.min(4, totalPages - 1);
    }
    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 3);
    }

    if (startPage > 2) {
      pageNumbers.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageChange = page => {
    if (page !== '...' && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className={cn()}>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          disabled={page === '...'}
          className={page === currentPage ? 'active' : ''}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
