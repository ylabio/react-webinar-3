import React, { memo, useEffect, useState } from "react";
import { generatePages } from "../../utils";
import "./style.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [displayPages, setDisplayPages] = useState([]);

  useEffect(() => {
    if (totalPages) {
      setDisplayPages(generatePages(totalPages, currentPage));
    }
  }, [currentPage, totalPages]);

  if (!totalPages) return null;

  return (
    <div className="Pagination">
      {displayPages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`Pagination-item ${
              page === currentPage ? "active" : ""
            }`}
          >
            {page}
          </button>
        ) : (
          <div className="Pagination-item">{page}</div>
        )
      )}
    </div>
  );
};

export default memo(Pagination);
