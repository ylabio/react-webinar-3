import React from "react";
import "./style.css";
import PaginationDots from "../pagination-dots";
import PaginationPage from "../pagination-page";

const Pagination = ({ totalPages, currentPage, category }) => {

  function pageRange(leftPage, rightPage) {
    let i = leftPage;
    const range = [];
    while (i <= rightPage) {
      range.push(i);
      i += 1;
    }
    return range;
  }

  const leftPage = "left";
  const rightPage = "right";

  function fetchPageNumbers() {
    if (totalPages > 1) {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      let pages = pageRange(startPage, endPage);

      const hasLeftPage = startPage > 2;
      const hasRightPage = totalPages - endPage > 1;
      const pagesPerView = 4 - (pages.length + 1);

      switch (true) {
        case hasLeftPage && !hasRightPage: {
          const extraPages = pageRange(startPage - pagesPerView, startPage - 1);
          pages = [leftPage, ...extraPages, ...pages];
          break;
        }

        case !hasLeftPage && hasRightPage: {
          const extraPages = pageRange(endPage + 1, endPage + pagesPerView);
          pages = [...pages, ...extraPages, rightPage];
          break;
        }

        case hasLeftPage && hasRightPage: {
          pages = [leftPage, ...pages, rightPage];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return pageRange(1, totalPages);
  }

  const pages = fetchPageNumbers();

  return (
    <ul className="Pagination">
      {pages.map((page, index) => {
        if (page === leftPage || page === rightPage) {
          return <PaginationDots key={index} />
        }
        return <PaginationPage key={index} page={page} category={category}/>;
      })}
    </ul>
  );
};

export default Pagination;
