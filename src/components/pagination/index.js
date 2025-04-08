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
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
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