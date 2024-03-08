import {memo} from "react";
import {usePagination} from './use-pagination';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function Pagination({totalCount, currentPage, pageSize, siblingCount}) {
	const cn = bem('Pagination');

	const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

	if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className={cn()}>
      <ul className={cn('list')}>
				{paginationRange.map((pageNum, index) => {
          return (
            <li
							className={cn('page-number', {active: pageNum === currentPage,  dots: pageNum === "..."})}
              key={index}
            >
              {pageNum}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number
};

export default memo(Pagination);