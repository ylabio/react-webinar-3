import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import useTranslate from '../../hooks/useTranslate';

function Pagination({ currentPage, totalItems, pageSize, onPageChange, onPageSizeChange }) {
  const t = useTranslate();
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];

    // Всегда первая страница
    pages.push(1);

    // Определяем диапазон вокруг текущей страницы
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Добавляем многоточие если нужно
    if (currentPage > 3) {
      pages.push('...');
    }

    // Страницы вокруг текущей
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Добавляем многоточие если нужно
    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Последняя страница (если не первая)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination-figma">
      {/* Селектор количества элементов */}
      <div className="figma-page-size">
        <span>{t.Filter}</span>
        <select value={pageSize} onChange={e => onPageSizeChange(Number(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Навигация по страницам */}
      <div className="figma-pages">
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className="figma-dots">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`figma-page ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
