import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Paginator({ totalPages, currentPage, onPageChange }) {
  const cn = bem('Paginator');

  const renderPageButtons = () => {
    const buttons = [];

    // Отображаем кнопки в зависимости от текущей страницы
    if (currentPage <= 2) {
      // Отображаем номера от 1 до текущей страницы
      for (let i = 1; i <= Math.min(totalPages, 3); i++) {
        buttons.push(
          <button key={i} className={`${cn("btn")} ${i === currentPage ? 'active' : ''}`} onClick={() => onPageChange(i)}>
            {i}
          </button>
        );
      }
      // Добавляем многоточие
      buttons.push(<span key="ellipsis1">...</span>);
      // Отображаем последнюю страницу
      buttons.push(
        <button key={totalPages} className={`${cn("btn")} ${totalPages === currentPage ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    } else if (currentPage === 3) {
      // Отображаем номера от 1 до 4
      for (let i = 1; i <= 4; i++) {
        buttons.push(
          <button key={i} className={`${cn("btn")} ${i === currentPage ? 'active' : ''}`} onClick={() => onPageChange(i)}>
            {i}
          </button>
        );
      }
      // Добавляем многоточие
      buttons.push(<span key="ellipsis1">...</span>);
      // Отображаем последнюю страницу
      buttons.push(
        <button key={totalPages} className={`${cn("btn")} ${totalPages === currentPage ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      );
    } else {
      // Отображаем кнопку "1"
      buttons.push(
        <button key={1} className={`${cn("btn")} ${1 === currentPage ? 'active' : ''}`} onClick={() => onPageChange(1)}>
          1
        </button>
      );

      // Добавляем многоточие, если текущая страница больше 3
      if (currentPage > 3) {
        buttons.push(<span key="ellipsis1">...</span>);
      }

      // Отображаем кнопки в зависимости от текущей страницы
      if (currentPage <= totalPages - 3) {
        // Отображаем номера страниц в диапазоне
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          buttons.push(
            <button key={i} className={`${cn("btn")} ${i === currentPage ? 'active' : ''}`} onClick={() => onPageChange(i)}>
              {i}
            </button>
          );
        }

        // Добавляем многоточие
        buttons.push(<span key="ellipsis2">...</span>);

        // Отображаем последнюю страницу
        buttons.push(
          <button key={totalPages} className={`${cn("btn")} ${totalPages === currentPage ? 'active' : ''}`} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        );
      } else {
        // Отображаем номера от totalPages - 3 до totalPages
        for (let i = totalPages - 3; i <= totalPages; i++) {
          buttons.push(
            <button key={i} className={`${cn("btn")} ${i === currentPage ? 'active' : ''}`} onClick={() => onPageChange(i)}>
              {i}
            </button>
          );
        }
      }
    }

    return buttons;
  };

  return (
    <div className={cn()}>
      {renderPageButtons()}
    </div>
  );
}

Paginator.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default React.memo(Paginator)