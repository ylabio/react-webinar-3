import {memo, useState} from "react";
import PropTypes from "prop-types";
import './style.css';
import {usePagination, DOTS} from '../../hooks/use-pagination'

function Pagination(props){
  const paginationRange = usePagination({
    currentPage: props?.currentPage,
    totalCount:  props?.count,
    limit:  props?.limit,
  });

  return (
    <div className='pagination'>
      <ul className='pagination-wrap'>
      { paginationRange.length && paginationRange.map((pageNumber, ind) => {
        if (pageNumber === DOTS) {
          return <li key={ind} className="pagination-item dots">&#8230;</li>;
        }
        const className = (props.currentPage === pageNumber) ? 'pagination-item selected' : 'pagination-item';
        return (
          <li key={ind} className={className}
              onClick={() => props.onPageChange(pageNumber)}
          >
            {+pageNumber}
          </li>
        );
      })}
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  skip: PropTypes.number,
  count: PropTypes.number,
  count: PropTypes.number,
  limit: PropTypes.number,
  currentPage:  PropTypes.number,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: () => {},
}

export default memo(Pagination);
