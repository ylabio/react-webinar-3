import React from "react";
import { usePagination, DOTS } from "../../store/use-pagination";
import "./pagination.css";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  return (
    <ul className={"Pagination"}>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li className="Pagination-dots" key={index}>&#8230;</li>;
        }

        return (
          <li
            className={`Pagination-item ${
              pageNumber === currentPage && "Pagination-item--active"
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
