import { memo } from "react";
import { paginator } from "../../utils";
import PaginationItem from "../pagination-item";
import "./style.css";
import PropTypes from "prop-types";

function Pagination({ currentPage, totalPages }) {
  const pagination = paginator(+currentPage, totalPages);
  const length = pagination.length;

  return (
    <div className="PaginationContainer">
      {pagination.map((page, index) => {
        return (
          <PaginationItem
            key={index}
            page={page}
            currentPage={currentPage}
            length={length}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default memo(Pagination);

Pagination.propTypes = {
  currentPage: PropTypes.string,
  totalPages: PropTypes.number,
};
