import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ListToggle({ totalPages, currentPage, onPageChange }) {
  const cn = bem('ListToggle');

  const renderPages = () => {
    const buttons = [];
    const maxVisibleButtons = 3; // Сколько кнопок показывать вокруг текущей страницы

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

    if (currentPage > maxVisibleButtons) {
      buttons.push(<span key="start-ellipsis">...</span>);
    }

    const startPage = Math.max(2, currentPage - (currentPage === totalPages ? 2 : 1));
    const endPage = Math.min(totalPages - 1, currentPage + (currentPage === 1 ? 2 : 1));

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

    if (currentPage < totalPages - (maxVisibleButtons - 1)) {
      buttons.push(<span key="end-ellipsis">...</span>);
    }

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
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(ListToggle);
