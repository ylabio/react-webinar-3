/**
 * Генерирует массив номеров страниц для отображения в пагинации.
 * @param {number} currentPage - Текущая страница.
 * @param {number} totalPages - Общее количество страниц.
 * @param {number} visiblePageCount - Максимальное количество отображаемых номеров страниц.
 * @returns {number[]} - Массив номеров страниц.
 */
export const getPageNumbers = (currentPage, totalPages, visiblePageCount) => {
  const pageNumbers = [];

  if (totalPages <= visiblePageCount) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('...');
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage === 1) {
      endPage = Math.min(3, totalPages - 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
  }

  return pageNumbers;
};
