import Main from "../../app/main";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxVisibleButtons = 5; // Максимальное количество видимых кнопок страниц

  const startPage = () => {
    if (currentPage === 1) return 1;
    if (totalPages < maxVisibleButtons) return 1;
    if (currentPage === totalPages) return totalPages - maxVisibleButtons + 1;
    return currentPage - 1;
  };

  const endPage = () => {
    if (totalPages === 0) return 1;
    if (totalPages < maxVisibleButtons) return totalPages;
    return Math.min(startPage() + maxVisibleButtons - 1, totalPages);
  };

  const isInFirstPage = () => currentPage === 1;
  const isInLastPage = () => currentPage === totalPages;

  const onClickFirstPage = () => {
    if (isInFirstPage()) return;
    onPageChange(1);
  };

  const onClickPreviousPage = () => {
    if (isInFirstPage()) return;
    onPageChange(currentPage - 1);
  };

  const onClickPage = (page) => {
    onPageChange(page);
  };

  const onClickNextPage = () => {
    if (isInLastPage()) return;
    onPageChange(currentPage + 1);
  };

  const onClickLastPage = () => {
    if (isInLastPage()) return;
    onPageChange(totalPages);
  };

  const isPageActive = (page) => currentPage === page;

  const pages = [];
  for (let i = startPage(); i <= endPage(); i++) {
    pages.push(
      <li key={i} className="pagination-item">
        <button
          onClick={() => onClickPage(i)}
          className={isPageActive(i) ? 'active' : ''}
        >
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li className="pagination-item">
          <button
            onClick={onClickFirstPage}
            className={isInFirstPage() ? 'disabled' : ''}
            disabled={isInFirstPage()}
          >
            Первая
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={onClickPreviousPage}
            className={isInFirstPage() ? 'disabled' : ''}
            disabled={isInFirstPage()}
          >
            «
          </button>
        </li>
        {pages}
        <li className="pagination-item">
          <button
            onClick={onClickNextPage}
            className={isInLastPage() ? 'disabled' : ''}
            disabled={isInLastPage()}
          >
            »
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={onClickLastPage}
            className={isInLastPage() ? 'disabled' : ''}
            disabled={isInLastPage()}
          >
            Последняя
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
