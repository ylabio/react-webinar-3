import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {Link, useParams} from 'react-router-dom';

function Pagination({setCurrentPage, count, currentPage}) {
  const {pageNumber} = useParams();
  const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);

  useEffect(() => {
    setCurrentPageNumber(Number(pageNumber));
  }, [pageNumber]);

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== '...') {
      setCurrentPage(pageNumber);
    }
  };

  const totalPagesToShow = 3;
  const totalPages = Math.ceil(count / 10);

  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage, endPage;
      if (currentPageNumber <= 2) {
        startPage = 1;
        endPage = totalPagesToShow;
      } else if (currentPageNumber >= totalPages - 1) {
        startPage = totalPages - totalPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPageNumber - 1;
        endPage = currentPageNumber + 1;
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

  return (
    <div className="Pagination">
      {getPageNumbers().map((pn, index) => (
        <Link key={index} to={`/main/${pn}`} className={pn === '...' ? 'disabled-link' : ''}>
          <span
            className={pn === '...' ? 'page-number' : pn === currentPageNumber ? 'page-number + active' : 'page-number + pointer'}
            onClick={() => handlePageClick(pn)}
          >
            {pn}
          </span>
        </Link>
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
