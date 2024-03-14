import React from 'react';
import './style.css';

function Pagination({articlesPerPage, totalArticles, currentPage, onPageChange}) {
  if (!totalArticles) {
    return;
  }

  const pageNumbers = [];
  const totalPages = Math.ceil(totalArticles / articlesPerPage);

  if (currentPage < 3) {
    for (let i = 1; i <= 3; i++) {
      pageNumbers.push(i);
    }
    pageNumbers.push('...');
    pageNumbers.push(totalPages);
  } else if (currentPage > totalPages - 2) {
    pageNumbers.push(1);
    pageNumbers.push('...');
    for (let i = totalPages - 2; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);
    pageNumbers.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pageNumbers.push(i);
    }
    if (currentPage !== totalPages - 2) {
      pageNumbers.push('...');
    }
    pageNumbers.push(totalPages);
  }

  return (
    <div className='Pagination'>
      <ul className='Pagination-list'>
        {pageNumbers.map((number, index) => (
          <li
            className={`Pagination-item ${currentPage === number ? 'active' : ''}`}
            key={index}
          >
            {number === '...'
              ? <span className='Pagination-dots'>{number}</span>
              : <div className='Pagination-link' onClick={() => onPageChange(number)}>{number}</div>
            }
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(Pagination);