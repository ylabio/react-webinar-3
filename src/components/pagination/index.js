import React from 'react';
import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ currentPage = 0, lastPage = 0, setCurrentPage }) {
  // Функция для генерации пунктов пагинации
  const generatePaginationItems = () => {
    const items = [];
    const resolveClassName = (condition) => condition ? "Pagination-item--active" : "Pagination-item";

    // Добавляем пункт для первой страницы
    items.push(
      <li key={0} onClick={() => setCurrentPage(0)} className={resolveClassName(currentPage === 0)}>
        1
      </li>
    );

    // Если текущая страница больше 2, добавляем "..." перед текущей страницей
    if (currentPage > 2) {
      items.push(<li className='Pagination-ellipsis' key="ellipsisBefore">...</li>);
    }

    // Генерируем пункты для текущей страницы и ее соседей
    if (currentPage < 2) {
      for (let i = Math.max(currentPage - 1, 1); i <= currentPage + 2; i++) {
        items.push(
          <li
            key={i}
            onClick={() => setCurrentPage(i)}
            className={resolveClassName(currentPage === i)}
          >
            {i + 1}
          </li>
        );
      }
    }
    if (currentPage >= 2) {
      for (let i = Math.max(currentPage - 1, 1); i <= Math.min(currentPage + 1, lastPage); i++) {
        items.push(
          <li
            key={i}
            onClick={() => setCurrentPage(i)}
            className={resolveClassName(currentPage === i)}
          >
            {i + 1}
          </li>
        );
      }
    }
    if (currentPage === lastPage) {
      items.splice(-2, 0, <li className='Pagination-item' onClick={() => setCurrentPage(lastPage - 2)} key={lastPage - 2}>{lastPage - 2}</li>)
    }

    // Если текущая страница меньше предпоследней, добавляем "..." после текущей страницы
    if (currentPage < lastPage - 2) {
      items.push(<li className='Pagination-ellipsis' key="ellipsisAfter">...</li>);
    }

    // Добавляем пункт для последней страницы
    if (currentPage < lastPage - 1) {
      items.push(
        <li key={lastPage} onClick={() => setCurrentPage(lastPage)} className={resolveClassName(currentPage === lastPage)}>
          {lastPage + 1}
        </li>
      );
    }

    return items;
  };

  return (
    lastPage ? <ul className="Pagination" >
      {generatePaginationItems()}
    </ul> : null
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  lastPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};

export default memo(Pagination);
