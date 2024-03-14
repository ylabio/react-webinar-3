import React from 'react';
import { memo, useCallback, useEffect, useState,useContext} from "react";
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const store = useStore();
  const cn = bem('pagination');
  useEffect(() => {
    store.actions.catalog.load();
  }, []);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const visiblePages = 3;
    const halfVisiblePages = Math.floor(visiblePages / 2);
    let startPage = currentPage - halfVisiblePages;
    let endPage = currentPage + halfVisiblePages;

    if (startPage <= 0) {
      startPage = 1;
      endPage = visiblePages;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - visiblePages + 1;
      if (startPage <= 0) {
        startPage = 1;
      }
    }

    if (startPage > 1) {
      pageNumbers.push(1);
      if (startPage > 2) {
        pageNumbers.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      const isCurrent = number === currentPage;
      const isEllipsis = number === '...';
      const itemClasses = cn('page', { current: isCurrent, ellipsis: isEllipsis });
      const handleClick = () => {
        if (!isEllipsis && !isCurrent) {
          onPageChange(number);
        }
      };
      return (
        <Link to={`/${number}`}
        
          key={index}
          className={itemClasses}
          onClick={handleClick}
        >
          {number}
        </Link>
      );
    });
  };

  return (
    <div className={cn()}>
      {renderPageNumbers()}
    </div>
  );
};
export default Pagination;