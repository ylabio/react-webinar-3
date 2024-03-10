import { memo } from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import PropTypes from "prop-types";

function Pagination({onChangePage, limit, page, count }) {

  const cn = bem('Pagination');

  const allPages = Math.ceil(count / limit)

  const getPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;

    let firstPage = Math.max(page - Math.floor(visiblePages / 2), 1 )
    let endPage = Math.min(firstPage +  visiblePages - 1, allPages);

    if (endPage - firstPage + 1 < visiblePages) {
      firstPage = Math.max(endPage - visiblePages + 1, 1);
    }
    if (endPage - firstPage + 1 < visiblePages) {
      endPage = Math.min(firstPage + visiblePages - 1, allPages);
    }

    for (let i = firstPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (firstPage > 2) {
      pageNumbers.unshift('...');
    }
    if (endPage < allPages - 1) {
      pageNumbers.push('...');
    }

    if (!pageNumbers.includes(1)) {
      pageNumbers.unshift(1);
    }
    if (!pageNumbers.includes(allPages)) {
      pageNumbers.push(allPages);
    }
    return pageNumbers;
  }


  return (
    <div className={cn()}>
      {getPageNumbers().map((pageNumber, index) => (
        <span
          key={index}
          className={cn('item', {active: pageNumber === page,  dots: pageNumber === "..."})}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </span>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  count: PropTypes.number,
  onChangePage: PropTypes.func,
};

Pagination.defaultProps = {
  onChangePage: () => {}
};

export default memo(Pagination);