import React from 'react';
import './style.css';

const Pagination = ({ currentPage, onPageChange, totalPages }) => {

  const getPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 2) {
        pageNumbers.push(1, 2, 3, '...', totalPages)
      } else if (currentPage === 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else if (currentPage === totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  const handlePageChange = (page) => {
    if (page !== '...') {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {getPageNumbers().map((page, index) => (
        <span
          key={index}
          className={currentPage === page ? 'active' : ''}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};

export default Pagination;