import PropTypes from 'prop-types';
import './style.css'
import { generateAllPages } from '../../utils';

const Pagination = ({ totalPages, currentPage, handleSelectPage }) => {
  const allPages = generateAllPages(totalPages, currentPage)

  const callbacks = {
    onClick: (numberPage) => handleSelectPage(numberPage)
  }

  return (
    <div className="Pagination-wrapper">
      <div className="Pagination">
        {allPages.map((page, index) => (
          <PaginationNumber
            key={index}
            page={page}
            onClick={callbacks.onClick}
            isActive={currentPage === page}
          />
        ))}
      </div>
    </div>
  );
};

function PaginationNumber({ page, onClick, isActive }) {
  return typeof page === 'number' && !isActive ? (
      <button
        className='Pagination-element Pagination-page'
        onClick={() => onClick(prev => ({oldValue: prev.newValue, newValue: page}))}
      >
        {page}
      </button>
    ) : (
      <div
        className={'Pagination-element ' +
          (isActive ? 'Pagination-page--selected' : '') +
          (page === '...' ? 'Pagination-dots' : '')
      }
      >
        {page}
      </div>
  )
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  handleSelectPage: PropTypes.func
}

export default Pagination;