import PropTypes from 'prop-types';
import './style.css'
import { generateAllPages } from '../../utils';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

const Pagination = ({ totalPages }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const callbacks = {
    onClick: (numberPage) => handleSelectPage(numberPage)
  }
  
  const pathname = useLocation().pathname
  const currentPage = Number(searchParams.get('page')) || 1
  const creatPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generateAllPages(totalPages, currentPage)
  
  return (
    <div className="Pagination-wrapper">
      <div className="Pagination">
        {allPages.map((page, index) => (
          <PaginationNumber
            href={creatPageURL(page)}
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

function PaginationNumber({ href, page, isActive }) {
  return typeof page === 'number' && !isActive ? (
      <Link
        to={href}
        className='Pagination-element Pagination-page'
      >
        {page}
      </Link>
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