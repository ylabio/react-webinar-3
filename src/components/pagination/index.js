import {memo} from "react";
import {usePagination} from './use-pagination';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './style.css';

function Pagination({totalCount, currentPage, pageSize, siblingCount, onChangePage, path}) {
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
			{paginationRange.map((pageNum, index) => {
        return (
          <Link to={`${path}${pageNum}`}
								className={cn('page-number', {active: pageNum === currentPage,  dots: pageNum === "..."})}
								onClick={() => onChangePage(pageNum)}
          		  key={index}>
            {pageNum}
          </Link>
        );
      })}
    </div>
  );
};

Pagination.propTypes = {
	onChangePage: PropTypes.func,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
	path: PropTypes.string,
};

export default memo(Pagination);