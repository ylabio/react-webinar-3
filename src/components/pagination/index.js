import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function getPagination(currentPage, totalPages) {
  const pages = [];
  
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    

    const start = Math.max(2, currentPage - 1);
    let end;

    if (currentPage < 2) {
      end = Math.min(totalPages - 1, currentPage + 2);
    } else {
      end = Math.min(totalPages - 1, currentPage + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);
  }

  return pages;
}
function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
}) {
  const paginationItems = getPagination(currentPage, totalPages);

  return (
    <>
      {paginationItems.map((item, index) => {
        if (item === '...') {
          return (
            <span key={`dots-${index}`} className="dots">
              ...
            </span>
          );
        }
        return (
          <button
            key={`page-${item}`}
            onClick={() => onPageChange(item)}
            className={item === currentPage ? 'active' : 'inactive'}
          >
            {item}
          </button>
        );
      })}
    </>
  );
}

Pagination.propTypes = {

  currentPage: PropTypes.number,

  totalPages: PropTypes.number,

  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
