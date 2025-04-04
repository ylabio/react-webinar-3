import React, { memo } from 'react';
import './style.css';

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  currentQuantity,
  setCurrentQuantity,
  availableQuantities,
}) => {
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleQuantityChange = quantity => {
    setCurrentQuantity(quantity);
  };

  const renderPage = () => {
    const pages = [];
    const maxPagesToShow = 5; // Максимальное количество страниц для отображения

    // Логика для отображения страниц
    if (totalPages <= maxPagesToShow) {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>,
        );
      }
    } else {
      // Показываем первую страницу
      pages.push(
        <button
          key={1}
          className={`page-item ${currentPage === 1 ? 'active' : ''}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>,
      );

      // Добавляем многоточие, если текущая страница далеко от начала
      if (currentPage > 3) {
        pages.push(
          <span key="ellipsis-start" className="page-ellipsis">
            ...
          </span>,
        );
      }

      // Показываем страницы вокруг текущей
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button
            key={i}
            className={`page-item ${currentPage === i ? 'active' : ''}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>,
        );
      }

      // Добавляем многоточие, если текущая страница далеко от конца
      if (currentPage < totalPages - 2) {
        pages.push(
          <span key="ellipsis-end" className="page-ellipsis">
            ...
          </span>,
        );
      }

      // Показываем последнюю страницу
      pages.push(
        <button
          key={totalPages}
          className={`page-item ${currentPage === totalPages ? 'active' : ''}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  const renderQuantities = () => {
    return availableQuantities.map(quantity => (
      <button
        key={quantity}
        className={`page-item ${currentQuantity === quantity ? 'active' : ''}`}
        onClick={() => handleQuantityChange(quantity)}
      >
        {quantity}
      </button>
    ));
  };

  return (
    <div className="pagination">
      <div className="quantity-container">
        <h3>Показать товары: </h3>
        {renderQuantities()}
      </div>
      <div className="page-container">{renderPage()}</div>
    </div>
  );
};

export default memo(Pagination);
