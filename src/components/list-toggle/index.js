import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ListToggle({ totalPages, currentPage, onPageChange }) {
  const cn = bem('ListToggle');

  // Генерация кнопок пагинации (1, 2, ..., 5, 6, 7, ..., 24, 25)
  const renderPages = () => {
    const buttons = [];
    const maxVisibleButtons = 1; // Сколько кнопок показывать вокруг текущей страницы

    // Добавляем первую страницу
    buttons.push(
      <button
        key={1}
        type="button"
        className={currentPage === 1 ? 'active' : ''}
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );

    // Добавляем "..." если текущая страница далеко от начала
    if (currentPage > maxVisibleButtons) {
      buttons.push(<span key="start-ellipsis">...</span>);
    }

    // Добавляем кнопки вокруг текущей страницы
    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          type="button"
          className={currentPage === i ? 'active' : ''}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Добавляем "..." если текущая страница далеко от конца
    if (currentPage < totalPages - (maxVisibleButtons - 1)) {
      buttons.push(<span key="end-ellipsis">...</span>);
    }

    // Добавляем последнюю страницу (если она не 1)
    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          type="button"
          className={currentPage === totalPages ? 'active' : ''}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return <div className={cn()}>{renderPages()}</div>;
}

ListToggle.propTypes = {
  totalPages: PropTypes.number.isRequired, // Общее количество страниц
  currentPage: PropTypes.number.isRequired, // Текущая страница
  onPageChange: PropTypes.func.isRequired, // Функция для смены страницы
};

export default memo(ListToggle);
