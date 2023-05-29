import React from "react";
import "./style.css";

function Pagination({ currentPage, onPageChange, totalPages }) {
  // const totalPages = 55;
  const pageNumbers = generatePageNumbers(totalPages);

  const handlePageChange = (page) => {
    if (page === "...") return;
    onPageChange(page);
  };

  function generatePageNumbers(totalPages) {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const pageNumbers = [1];

      if (currentPage <= 2) {
        pageNumbers.push(2, 3);
        if (totalPages > 3) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        if (totalPages > 4) {
          pageNumbers.push("...");
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        if (currentPage > 3) {
          pageNumbers.push("...");
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        if (totalPages - currentPage > 2) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }

      return pageNumbers;
    }
  }

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber, index) => (
        <div
          key={index}
          className={
            pageNumber === currentPage ? "page-number active" : "page-number"
          }
          onClick={() => handlePageChange(pageNumber)}
        >
          {pageNumber}
        </div>
      ))}
    </div>
  );
}

export default Pagination;
