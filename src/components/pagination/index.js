import React from 'react'

function Pagination({currentPage, pages}) {
  return (
    <div className='Pagination'>
        {currentPage > 3 && <span>...</span>}
        <button className='Pagination-button'>{currentPage !== 1 ? currentPage - 1 : currentPage}</button>
        <button className='Pagination-button'>{currentPage == 1 ? currentPage + 1 : currentPage}</button>
        <button className='Pagination-button'>{currentPage == currentPage ? currentPage : currentPage + 2}</button>
    </div>
  )
}

export default Pagination