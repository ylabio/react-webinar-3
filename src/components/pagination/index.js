import { memo } from 'react';
import PropTypes from 'prop-types';
import { usePagination } from '../../hooks/usePagination';
import './style.css';

function Pagination(props) {
  const paginationRange = usePagination({
    totalItems: props.totalItems,
    limit: props.limit ?? 10,
    siblingPages: props.siblingPages ?? 1,
    currentPage: props.currentPage,
  });

  return (
    <nav className="Navigation" aria-label="pagination">
      <ul className="Pagination">
        {paginationRange?.map((page, i) => {
          if (page === 'dots') {
            return <li key={i}>&#8230;</li>;
          }

          return (
            <li
              key={i}
              onClick={e => {
                e.preventDefault();
                props.onPageChange(page);
              }}
            >
              <a href="" aria-current={props.currentPage === page ? 'page' : undefined}>
                <span className="Visually-hidden">page </span>
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default memo(Pagination);

Pagination.propTypes = {
  totalItems: PropTypes.number,
  limit: PropTypes.number,
  siblingPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};
