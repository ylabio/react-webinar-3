import React, { memo } from 'react';
import useSelector from '../../store/use-selector';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate } from 'react-router';

function Pagination() {
  const cn = bem('Pagination');
  const navigate = useNavigate();

  const { lastPage, currentPage } = useSelector((state) => ({
    lastPage: state.catalog.pages.lastPage,
    currentPage: state.catalog.pages.currentPage,
  }));

  const callbacks = {
    handlePageClick: (page) => () => {
      if (typeof page === 'number') {
        navigate(`/${page}`);
      }
    }
  }

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
          onClick={callbacks.handlePageClick(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
}

export default memo(Pagination);
