import React from "react";
import './style.css';
import { NavLink } from "react-router-dom";

const PaginationPage = ({ category, page }) => {
  return (
    <li className="Pagination__item">
      <NavLink
        className={({ isActive }) =>
          isActive ? "Pagination__item Pagination__item_active" : "Pagination__item"
        }
        to={`/${category}/${page}`}
      >
        {page}
      </NavLink>
    </li>
  );
};

export default PaginationPage;
