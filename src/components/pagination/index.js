import {memo, useState} from "react";
import PropTypes, { number } from "prop-types";
import "./style.css";

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, i) => i + start);
};

const getPageNumbers = (totalPages, siblings, currentPage ) => {
  const totalPageNumbers = siblings + 5;

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(
    currentPage + siblings,
    totalPages
  );

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = totalPages;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblings;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, 'DOTS', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    
    let rightItemCount = 3 + 2 * siblings;
    let rightRange = range(
      totalPages - rightItemCount + 1,
      totalPages
    );
    return [firstPageIndex, 'DOTS', ...rightRange];
  }
   
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
  }
}

function Pagination({onPageChange, totalCount, itemsPerPage, currentPage, siblingCount = 1}) {
  let pages = [];
  const totalPageCount = Math.ceil(totalCount / itemsPerPage);
  pages = getPageNumbers(totalPageCount, siblingCount, currentPage);

  return (
      <div className='Pagination'>
        {pages.map((page) => {
          if (page === 'DOTS') {
            return <div key={Math.random()} className="pagination-item dots">&#8230;</div>;
          }
          
          return (
            <button 
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? "Pagination-button--active" : "Pagination-button"}
            >
              {page}
            </button>
          )})}
      </div> 
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalCount: number,
  itemsPerPage: number,
  currentPage: number,
  siblingCount: number,
};

Pagination.defaultProps = {
  onPageChange: () => {},
  totalCount: 10,
  itemsPerPage: 10,
  currentPage: 1,
  siblingCount: 1,
};

export default memo(Pagination);
