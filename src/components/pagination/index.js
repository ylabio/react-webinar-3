import { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import useTranslate from '../../hooks/useTranslate';
import './style.css';

function Pagination({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange, availableSizes }) {
  const cn = bem('Pagination');
  const t = useTranslate();

  const handlePageClick = useCallback((page) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }, [currentPage, onPageChange]);

  const handlePageSizeChange = useCallback((e) => {
    const newSize = parseInt(e.target.value);
    onPageSizeChange(newSize);
  }, [onPageSizeChange]);

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 1; //видимое количество страниц вокруг текущей
    
    // показываем первую страницу всегда
    pages.push(
      <button
        key={1}
        className={cn('page', { active: currentPage === 1 })}
        onClick={() => handlePageClick(1)}
      >
        1
      </button>
    );

    // Логика для отображения страниц и многоточий
    let startPage = 2;
    let endPage = Math.min(totalPages - 1, currentPage + maxVisiblePages);

    // Специальная логика для первых страниц
    if (currentPage === 1) {
      endPage = Math.min(3, totalPages - 1); // Показываем только 2 и 3
    } 
    else if (currentPage === 2) {
      endPage = 3; // Показываем только 3 страницу
    }
    // Специальная логика для последних страниц
    else if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 2); // Показываем n-2 и n-1
      endPage = totalPages - 1;
      
      // Добавляем многоточие если между 1 и startPage есть разрыв
      if (startPage > 2) {
        pages.push(<span key="start-ellipsis" className={cn('ellipsis')}>...</span>);
      }
    }
    // Общий случай
    else if (currentPage > maxVisiblePages + 2) {
      pages.push(<span key="start-ellipsis" className={cn('ellipsis')}>...</span>);
      startPage = currentPage - maxVisiblePages;
    }

    // Добавляем видимые страницы в диапазоне
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) { // Исключаем первую и последнюю, так как они уже добавлены
        pages.push(
          <button
            key={i}
            className={cn('page', { active: currentPage === i })}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </button>
        );
      }
    }

    // Определяем, нужно ли последнее многоточие
    if (endPage < totalPages - 1 && currentPage < totalPages - 2) {
      pages.push(<span key="end-ellipsis" className={cn('ellipsis')}>...</span>);
    }

    // Добавляем последнюю страницу, если она не первая
    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          className={cn('page', { active: currentPage === totalPages })}
          onClick={() => handlePageClick(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={cn()}>
      <div className={cn('page-size-selector')}>
        <span className={cn('page-size-label')}>{t('show')}</span>
        <select 
          className={cn('page-size-select')} 
          value={pageSize} 
          onChange={handlePageSizeChange}
        >
          {availableSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>
      {renderPageNumbers()}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageSizeChange: PropTypes.func.isRequired,
  availableSizes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default memo(Pagination);