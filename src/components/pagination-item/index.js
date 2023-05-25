import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import PropTypes from "prop-types";

function PaginationItem({ page, currentPage, length, index }) {
  return (
    <div className={`PageItem ${currentPage == page ? "Active" : ""}`}>
      <Link
        to={`/?page=${
          page === "..."
            ? index > length / 2
              ? +currentPage + 2
              : +currentPage - 2
            : page
        } `}
      >
        {page}
      </Link>
    </div>
  );
}

export default memo(PaginationItem);

PaginationItem.propTypes = {
  length: PropTypes.number,
  index: PropTypes.number,
};
