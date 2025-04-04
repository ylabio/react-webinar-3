import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const itemsPerPageOptions = [5, 10, 20];

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    // Всегда показываем первую страницу
    pages.push(1);

    // Логика отображения страницы 1
    if (currentPage === 1 && totalPages > 3) {
      pages.push(2, 3);
      if (totalPages > 4) pages.push('...');
    }
    // Логика отображения последней страницы
    else if (currentPage === totalPages) {
      if (totalPages >= 3) {
        if (totalPages > 3) pages.push('...');
        pages.push(totalPages - 2, totalPages - 1);
      }
      if (totalPages >= 2) {
        pages.push(totalPages);
      }
    }
    // Логика для страниц в середине
    else if (currentPage > 1 && currentPage < totalPages) {
      if (currentPage > 3) pages.push('...');

      // Показываем текущую страницу и соседние
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push('...');
    }

    // Всегда показываем последнюю страницу (если не одна страница)
    if (totalPages > 1) {
      // Для случая когда текущая страница 1, а totalPages = 3
      if (currentPage === 1 && totalPages === 3 && !pages.includes(3)) {
        pages.push(3);
      } else if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="pagination">
      <div className="items-per-page">
        <span>Показывать по:</span>
        <select value={itemsPerPage} onChange={e => onItemsPerPageChange(Number(e.target.value))}>
          {itemsPerPageOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="page-numbers">
        {getPageNumbers().map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={currentPage === page ? 'active' : ''}
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
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onItemsPerPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);
