import PropTypes from 'prop-types';
import { getPages } from '../../utils';
import './style.css';

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  const pages = getPages(currentPage, totalPages);

  return (
    <div className='Pagination'>
      <button
        className={`Pagination-button ${
          currentPage === 0 ? 'Pagination-button_selected' : ''
        }`}
        disabled={currentPage === 0}
        onClick={() => setCurrentPage(0)}
      >
        1
      </button>
      {currentPage > 2 && <span className='Pagination-dots'>...</span>}
      {pages.map((page) => (
        <button
          className={`Pagination-button ${
            currentPage === page ? 'Pagination-button_selected' : ''
          }`}
          key={page}
          disabled={currentPage === page}
          onClick={() => setCurrentPage(page)}
        >
          {page + 1}
        </button>
      ))}
      {currentPage < totalPages - 3 && (
        <span className='Pagination-dots'>...</span>
      )}
      <button
        className={`Pagination-button ${
          currentPage === totalPages - 1 ? 'Pagination-button_selected' : ''
        }`}
        disabled={currentPage === totalPages - 1}
        onClick={() => setCurrentPage(totalPages - 1)}
      >
        {totalPages}
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default Pagination;
