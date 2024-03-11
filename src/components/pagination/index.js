import {memo, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";

function Pagination({ total, limit, onPageChange, currentPage}) {
  const totalPages = Math.ceil(total/limit);

  const onPageClick = (item) => {
    onPageChange(item);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Если активная страница <= 2, отображаем 1,2,3,...последняя
    if (currentPage <= 2) {
      for (let i = 1; i <= Math.min(3, totalPages); i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (totalPages > 2) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
      // Если активная страница === 3, отображаем 1,2,3,4...последняя
    } else if (currentPage === 3) {
      for (let i = 1; i <= Math.min(4, totalPages); i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (totalPages > 4) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
    } else {
      // Если активная страница !== 3, отображаем 1,...страница перед, активная, страница после,...последняя
      pageNumbers.push(renderPageButton(1));
      pageNumbers.push(<span key="ellipsis2">...</span>);

      const start = Math.max(1, currentPage - 1);
      const end = Math.min(currentPage + 1, totalPages);

      for (let i = start; i <= end; i++) {
        pageNumbers.push(renderPageButton(i));
      }

      if (end < totalPages) {
        pageNumbers.push(<span key="ellipsis3">...</span>);
        pageNumbers.push(renderPageButton(totalPages));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (pageNumber) => (
    <div
      key={pageNumber}
      onClick={() => onPageClick(pageNumber)}
      className={`Pagination-item ${currentPage === pageNumber ? 'Pagination-item-active' : ''}`}
    >
      {pageNumber}
    </div>
  );

  return (
    <div className='Pagination'>
      {renderPageNumbers()}
    </div>
  )
}

export default memo(Pagination);
