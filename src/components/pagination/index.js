import { memo } from "react";
import "./style.css";

function Pagination({ changePage, currentPage, totalPages }) {
  const pageNumbers = [];

  // Добавляем первую страницу только если текущая страница больше чем вторая
  if (currentPage > 2) {
    pageNumbers.push(1);
  }

  // Условие для отображения многоточия после первой страницы
  if (currentPage > 3) {
    pageNumbers.push("...");
  }

  // Логика для добавления страниц близких к текущей
  if (currentPage === 1) {
    pageNumbers.push(1, 2, 3); // Добавляем первые три страницы, если выбрана первая
  } else if (currentPage === totalPages && totalPages > 3) {
    pageNumbers.push(totalPages - 2, totalPages - 1, totalPages); // Добавляем три последние страницы, если выбрана последняя
  } else {
    // Для остальных случаев добавляем предыдущую, текущую и следующую страницы
    if (currentPage === 2) {
      // Для второй страницы избегаем дублирования первой
      pageNumbers.push(1, 2, 3);
    } else if (currentPage === totalPages - 1) {
      // Для предпоследней страницы избегаем дублирования последней
      pageNumbers.push(totalPages - 2, totalPages - 1, totalPages);
    } else {
      pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
    }
  }

  // Условие для отображения многоточия перед последней страницей
  if (currentPage < totalPages - 2) {
    pageNumbers.push("...");
  }

  // Добавляем последнюю страницу, только если текущая страница меньше чем предпоследняя
  if (currentPage < totalPages - 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <nav>
      <ul className="Pagination">
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`Pagination-item ${
              currentPage === number ? "active" : ""
            }`}
          >
            {number === "..." ? (
              <span className="Pagination-item-link">{number}</span>
            ) : (
              <a
                onClick={(e) => {
                  e.preventDefault();
                  changePage(number);
                }}
                href="#!"
                className="Pagination-item-link"
              >
                {number}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default memo(Pagination);
