import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  textFilter = '',
}) {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages = [];

    // Всегда добавляем первую страницу
    pages.push(1);

    if (totalPages <= 4) {
      // Если страниц 4 или меньше - показываем все
      for (let i = 2; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        // Страницы 1 и 2: 1 2 3 ... last
        pages.push(2);
        pages.push(3);
        pages.push('...');
      } else if (currentPage === 3) {
        // Страница 3: 1 2 3 4 ... last
        pages.push(2);
        pages.push(3);
        pages.push(4);
        pages.push('...');
      } else if (currentPage >= totalPages - 2) {
        // Последние 3 страницы
        pages.push('...');

        if (currentPage === totalPages - 2) {
          // Для предпоследней-2 (53 при total=55)
          pages.push(totalPages - 3);
        }

        // Всегда показываем последние 3 страницы
        pages.push(totalPages - 2);
        pages.push(totalPages - 1);
        pages.push(totalPages);
      } else {
        // Средние страницы: 1 ... (current-1) current (current+1) ... last
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
      }

      // Удаляем дубликаты последней страницы
      if (pages[pages.length - 1] === totalPages) {
        pages.pop();
      }

      // Всегда добавляем последнюю страницу
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    // Удаляем возможные дубликаты многоточий
    return pages.filter((item, index, arr) => {
      return index === 0 || item !== arr[index - 1] || typeof item !== 'string';
    });
  };

  return (
    <div className="pagination-figma">
      {/* Селектор количества элементов */}
      <div className="figma-page-size">
        <span>{textFilter}</span>
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
