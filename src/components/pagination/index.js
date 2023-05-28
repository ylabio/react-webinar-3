import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import PaginationLink from '../pagination-link';
import './style.css';

function Pagination({currentPage, pages, onChangePage}) {
  pages = 6;
  const leftDots = currentPage > 3 && pages > 5;
  const leftDotsView = <><PaginationLink index={1} onChangePage={onChangePage} /><span className='Pagination-dots'>...</span></>

  const rightDots = pages - currentPage > 2 && pages > 5;
  const rightDotsView = <><span className='Pagination-dots'>...</span><PaginationLink index={pages} onChangePage={onChangePage} /></>

  const fillArr = (from, to) => {
    let elems = [];

    for (let i = from; i <= to; i++) {
      elems.push(<PaginationLink key={`pagination-link-key-${i}`} index={i} onChangePage={onChangePage} />)
    }

    return elems;
  }

  const generateElems = useCallback((i) => {
    // if (pages == 5) {
    //   return fillArr(1, pages)
    // }

    if (pages <= 5) {
      return fillArr(1, pages)
    }

    if (!rightDots && i == pages) {
      return fillArr(i-2, i)
    }

    if (!rightDots && i == pages - 2) {
      console.log('q');
      return fillArr(i-1, i+2)
    }

    if (!rightDots && i == pages - 1 || !leftDots && i == 2 || leftDots) {
      return fillArr(i-1, i+1)
    }

    if (!leftDots && i == 1) {
      return fillArr(i, i+2)
    }

    if (!leftDots && (i > 2 && i<= 3)) {
      return fillArr(i-2, i+1)
    }

  }, [currentPage, pages])

  return (
    <div className='Pagination'>
      {leftDots ? leftDotsView : null}
      {generateElems(currentPage)}
      {rightDots ? rightDotsView : null}
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  error: PropTypes.bool
}

export default React.memo(Pagination)