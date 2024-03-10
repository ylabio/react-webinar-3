import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DOTS, usePagination } from '../../hooks/usePagination';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination(props) {
  const { limit = 10, count, currentPage, onPageChange } = props;

  const paginationRange = usePagination([count, limit, currentPage]);

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index}>
              <button className={cn('dots')} disabled={true}>
                &#8230;
              </button>
            </li>
          );
        }
        return (
          <li key={index}>
            <button
              className={
                pageNumber === currentPage
                  ? cn('btn', { active: true })
                  : cn('btn')
              }
              onClick={() => {
                onPageChange(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  limit: PropTypes.number,
  count: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
