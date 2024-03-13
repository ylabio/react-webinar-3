import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

const Pagination = ({
  currentPage,
  totalPages,
  paginationRange = 1,
  breakLabel = "...",
  onPageChange,
}) => {
  let pages = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage < 3) {
      pages = [1, 2, 3];
      pages.push(breakLabel, totalPages);
    } else if (currentPage === 3) {
      pages = [1, 2, 3, 4];
      pages.push(breakLabel, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, breakLabel);
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1, breakLabel);
      for (
        let i = currentPage - paginationRange;
        i <= currentPage + paginationRange;
        i++
      ) {
        pages.push(i);
      }
      pages.push(breakLabel, totalPages);
    }
  }

  const cn = bem("Pagination");

  return (
    <div className={cn()}>
      {pages.map((page, index) =>
        page === breakLabel ? (
          <span className={cn("break")} key={index}>
            {page}
          </span>
        ) : (
          <span
            key={index}
            className={`${cn("item")} ${currentPage === page ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </span>
        )
      )}
    </div>
  );
};

export default Pagination;
