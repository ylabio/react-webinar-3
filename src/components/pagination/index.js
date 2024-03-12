import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { DOTS, usePagination } from '../../hooks/usePagination';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function Pagination(props) {
  const { limit = 10, count, currentPage, path=''} = props;

  const paginationRange = usePagination([count, limit, currentPage]);

  const cn = bem('Pagination');
  return (
    <ul className={cn()}>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index}>
              <div className={cn('dots')} disabled={true}>
                &#8230;
              </div>
            </li>
          );
        }
        return (
          <li key={index}>
            <Link
              to={`${path}/${pageNumber}`}
              className={
                pageNumber === currentPage
                  ? cn('btn', { active: true })
                  : cn('btn')
              }
            >
              {pageNumber}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

Pagination.propTypes = {
  limit: PropTypes.number,
  count: PropTypes.number.isRequired,
  path: PropTypes.string,
  currentPage: PropTypes.number.isRequired,
};

export default memo(Pagination);
