import React, { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';

import './style.css';

function Pagination({ lastPage, currentPage, onPageClick }) {
  const cn = bem('Pagination');

  function renderPagination() {
    const visiblePageCount = 3;
    const result = [];

    const startPage = Math.max(currentPage - Math.floor(visiblePageCount / 2), 1);
    const endPage = Math.min(startPage + visiblePageCount - 1, lastPage);

    if (currentPage > 2) result.push(1);
    if (startPage > 2) result.push('...');

    for (let i = startPage; i <= endPage; i++) {
      result.push(i);
    }

    if (endPage < lastPage - 1) result.push('...');
    if (currentPage < lastPage - 1) result.push(lastPage);
    if (currentPage === lastPage) result.splice(result.length - 2, 0, lastPage - 2);

    return result;
  }

  return (
    <div className={cn()}>
      {renderPagination().map((page, index) => (
        <span
          key={index}
          className={page === currentPage
            ? `${cn('page')} ${cn('active')}`
            : page === '...'
            ? `${cn('spread')}`
            : `${cn('page')}`
          }
          onClick={onPageClick(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  lastPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageClick: PropTypes.func,
}

export default memo(Pagination);
