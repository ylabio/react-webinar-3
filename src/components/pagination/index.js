import PropTypes from 'prop-types';
import './style.css'
import { generateAllPages } from '../../utils';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Pagination = ({ totalPages, isLoading, switchLoading }) => {
  const [oldPageNumber, setOldPageNumber] = useState(1) // it's used to defer render selected page, while list is rendering
  const [searchParams, setSearchParams] = useSearchParams();
  
  const pathname = useLocation().pathname
  const currentPage = !isLoading && Number(searchParams.get('page')) || oldPageNumber

  const creatPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generateAllPages(totalPages, currentPage)

  const callbacks = {
    onSwitchLoading: () =>  switchLoading(),
    onChangeOldPageNumber: () => setOldPageNumber(prev => prev = currentPage)
  }
  
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
            onSwitchLoading={callbacks.onSwitchLoading}
            onChangeOldPageNumber={callbacks.onChangeOldPageNumber}
          />
        ))}
      </div>
    </div>
  );
};

function PaginationNumber({ href, page, isActive, onSwitchLoading, onChangeOldPageNumber }) {
  return typeof page === 'number' && !isActive ? (
      <Link
        to={href}
        className='Pagination-element Pagination-page'
        onClick={() => {
          onChangeOldPageNumber()
          onSwitchLoading()
        }}
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