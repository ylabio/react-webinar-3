import { memo, useState } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Dots from "./Dots";
import "./style.css";

function Pagination({ itemCount, perPage, currentPage, setCurrentPage }) {
  const cn = bem("Pagination");

  const pagesCount = Math.ceil(itemCount / perPage);

  let min = 1;
  const pages = [];

  if (pagesCount > 5) {
    if (currentPage > 2) {
      pages.push(1);
      if (currentPage == pagesCount) {
        pages.push(pagesCount - 2);
      }
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i == pagesCount) break;
        pages.push(i);
      }
      pages.push(pagesCount);
    } else {
      pages.push(1);
      for (let i = 2; i <= 3; i++) {
        pages.push(i);
        if (i == pagesCount) break;
      }
      pages.push(pagesCount);
    }
    min = 1;
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
    }
    min = 0;
  }

  let lenght = pages.length;

  return (
    <div className={cn()}>
      {pages.map((page, index) => (
        <div key={index}>
          {min ? (
            <div>
              {lenght > 4 && page == currentPage - 1 && page != 2 && <Dots />}
              {lenght == 4 && page == pagesCount - 2 && <Dots />}
              <span
                className={
                  currentPage == page ? cn("current-page") : cn("page")
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </span>
              {lenght > 4 &&
                page == currentPage + 1 &&
                page != pagesCount - 1 && <Dots />}
              {lenght == 4 && page == 3 && <Dots />}
            </div>
          ) : (
            <span
              className={currentPage == page ? cn("current-page") : cn("page")}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  setCurrentPage: PropTypes.func,
  itemCount: PropTypes.number,
  perPage: PropTypes.number,
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  setCurrentPage: () => {},
  itemCount: 0,
  perPage: 1,
  currentPage: 1,
};

export default memo(Pagination);
