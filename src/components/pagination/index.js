import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({setCurrentPage, count, currentPage}) {


  const getPageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = 3;
    const totalPages = Math.ceil(count / 10)

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage, endPage;
      if (currentPage <= 2) {
        startPage = 1;
        endPage = totalPagesToShow;
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - totalPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      if (startPage > 1) {
        pageNumbers.unshift(1, '...');
      }
      if (endPage < totalPages) {
        pageNumbers.push('...', totalPages);
      }
    }

    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== '...') {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="Pagination">
      {getPageNumbers().map((pageNumber, index) => (
        <span
          key={index}
          className={pageNumber === currentPage ? 'active' : ''}
          onClick={() => handlePageClick(pageNumber)}
        >
        {pageNumber}
        </span>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default memo(Pagination);

