import React from 'react';

function Pagination({articlesPerPage, totalArticles, currentPage, onPageChange}) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div className='Pagination'>
      <ul className='Pagination-list'>
        {pageNumber.map((number => (
          <li
            className={`pagination__item ${currentPage === number
              ? 'pagination__item--active'
              : ''
            }`}
            key={number}
          >
            <a className='pagination__link' href={`#${number}`}
               onClick={() => onPageChange(number)}>{number}
            </a>
          </li>
        )))}
      </ul>
    </div>
  );
}

export default Pagination;