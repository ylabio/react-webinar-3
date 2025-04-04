import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useNavigate } from 'react-router';

const Pagination = ({ totalPages, currentPage, onPageChange, onLimitItem = () => {} }) => {
  const cn = bem('Pagination');
  const navigate = useNavigate();

  const handleChange = e => {
    onLimitItem(e.target.value);
    onPageChange(1);
  };

  const handleClick = page => {
    const path = page === 1 ? '/' : `/page/${page}`;
    navigate(path);
    onPageChange(page);
  };

  const getPages = () => {
    const pages = [];
    const delta = 1;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else if (currentPage < 3) {
      for (let i = 1; i <= 3; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (currentPage > totalPages - 2) {
      pages.push(1);
      pages.push('...');
      for (let i = totalPages - 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage == 3) {
        pages.push(2);
      } else {
        pages.push('...');
      }

      const startPage = Math.max(3, currentPage - delta);
      const endPage = Math.min(totalPages - 1, currentPage + delta);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - delta - 1) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className={cn()}>
      <select className={cn('selectList')} defaultValue={10} onChange={handleChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
      <div>
        {getPages().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className={cn('dots')}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`${cn('page')} ${page === currentPage ? cn('selected') : ''}`}
              onClick={() => handleClick(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onLimitItem: PropTypes.func,
};

export default Pagination;
