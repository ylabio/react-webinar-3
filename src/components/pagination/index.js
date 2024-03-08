import { memo } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function Pagination({ totalItems, itemsPerPage, onChangePage, number }) {

  const cn = bem('Pagination');

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 3;
    const middleIndex = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(number - middleIndex, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }
    if (endPage - startPage + 1 < maxVisiblePages) {
      endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 2) {
      pageNumbers.unshift('...');
    }
    if (endPage < totalPages - 1) {
      pageNumbers.push('...');
    }

    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
    }
    if (!pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  return (
    <div className={cn()}>
      {generatePageNumbers().map((pageNumber, index) => (
        <span
          key={index}
          className={cn('item', {active: pageNumber === number,  dots: pageNumber === "..."})}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  itemsPerPage: PropTypes.number,
  totalItems: PropTypes.number,
  onChangePage: PropTypes.func,
  number: PropTypes.number
};

Pagination.defaultProps = {
  onChangePage: () => {}
};

export default memo(Pagination);