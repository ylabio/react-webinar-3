// Pagination.js

import React from "react";
import "./style.css";
import CustomLink from "./custom-link";

function Pagination({ currentPage, totalPages }) {
  const renderPageLink = (page) => (
    <li className="Pagination-item">
      <CustomLink to={`/page/${page}`}>{page}</CustomLink>
    </li>
  );
  const renderEllipsis = () => <li className="Pagination-ellipsis">...</li>;
  if (!currentPage || currentPage === 2) {
    return (
      <ul className="Pagination">
        <li className="Pagination-item">
          <CustomLink to="/">1</CustomLink>
        </li>
        {renderPageLink(2)}
        {renderPageLink(3)}
        {renderEllipsis()}
        {renderPageLink(totalPages)}
      </ul>
    );
  }
  if (currentPage > 2 && currentPage <= totalPages - 3) {
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;
    return (
      <ul className="Pagination">
        <li className="Pagination-item">
          <CustomLink to="/">1</CustomLink>
        </li>
        {currentPage > 3 && renderEllipsis()}
        {renderPageLink(prevPage)}
        {renderPageLink(currentPage)}
        {renderPageLink(nextPage)}
        {renderEllipsis()}
        {renderPageLink(totalPages)}
      </ul>
    );
  }
  if (currentPage >= totalPages - 3 && currentPage <= totalPages) {
    return (
      <ul className="Pagination">
        <li className="Pagination-item">
          <CustomLink to="/">1</CustomLink>
        </li>
        {renderEllipsis()}
        {renderPageLink(totalPages - 3)}
        {renderPageLink(totalPages - 2)}
        {renderPageLink(totalPages - 1)}
        {renderPageLink(totalPages)}
      </ul>
    );
  }
}

export default Pagination;
