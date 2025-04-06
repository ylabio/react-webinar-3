import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ total, limit, skip, onPageChange, onLimitChange }) {
  const cn = bem('Pagination');
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const handleLimitChange = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    onLimitChange(newLimit);
  };

  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3);
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('...');
      pages.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1);
      pages.push('...');
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const handleEllipsisClick = (direction) => {
    if (direction === 'prev' && currentPage > 3) {
      handlePageChange(currentPage - 3);
    } else if (direction === 'next' && currentPage < totalPages - 2) {
      handlePageChange(currentPage + 3);
    }
  };

  return (
    <div className={cn()}>
      <div className={cn('limits')}>
        <div className={cn('limits')}>
          <select className={cn('select')} value={limit} onChange={handleLimitChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      <div className={cn('pages')}>
        {getPages().map((page, index) => {
          if (page === '...') {
            const isFirstEllipsis = index < getPages().indexOf(currentPage);
            return (
              <span
                key={`ellipsis-${index}`}
                className={cn('ellipsis')}
                onClick={() => handleEllipsisClick(isFirstEllipsis ? 'prev' : 'next')}
              >
                ...
              </span>
            );
          }
          return (
            <button
              key={page}
              className={cn('page', { active: page === currentPage })}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  skip: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
