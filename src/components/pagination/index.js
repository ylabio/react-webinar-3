import React from "react";
import "./style.css";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    const ellipsisThreshold = 2;
    const ellipsis = (
      <li key="ellipsis" className="ellipsis">
        ...
      </li>
    );

    if (totalPages <= maxPageNumbers) {
      for (let page = 1; page <= totalPages; page++) {
        pageNumbers.push(renderPageNumber(page));
      }
    } else {
      let leftEllipsis = false;
      let rightEllipsis = false;
      let startPage = currentPage - 1;
      let endPage = currentPage + 1;

      if (currentPage - 1 > ellipsisThreshold) {
        leftEllipsis = true;
        startPage = currentPage - ellipsisThreshold;
      }

      if (currentPage + 1 + ellipsisThreshold < totalPages) {
        rightEllipsis = true;
        endPage = currentPage + 1 + ellipsisThreshold;
      }

      for (let page = startPage; page <= endPage; page++) {
        if (page >= 1) {
          pageNumbers.push(renderPageNumber(page));
        }
      }

      if (leftEllipsis) {
        pageNumbers.unshift(ellipsis);
        pageNumbers.unshift(renderPageNumber(1));
      }

      if (rightEllipsis) {
        pageNumbers.push(renderPageNumber(totalPages));
        pageNumbers.push(ellipsis);
      }
    }

    return pageNumbers;
  };

  const renderPageNumber = (page) => {
    const isActive = currentPage === page;
    return (
      <li
        key={page}
        className={`page-number ${isActive ? "active" : ""}`}
        onClick={() => handlePageClick(page)}
      >
        {page}
      </li>
    );
  };

  return (
    <div className="pagination">
      <ul className="page-numbers">{renderPageNumbers()}</ul>
    </div>
  );
}

export default Pagination;
