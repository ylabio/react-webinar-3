import { memo, useCallback, useEffect, useState } from 'react'
import PropTypes, { number } from 'prop-types'
import './style.css';

function Pagination({countPages, currentPage, onChangePage}) {
  const array = [];
  for (let i = 1; i <= countPages; i++) {
    array.push(i);
  }

  const changePage = (numberPage) => {
    onChangePage(numberPage)
  }

  let dotsRendered = false;

  return (
    <div className='Pagination'>
      <div className='Pagination__content'>
        {array.map(number => {
          if (number === 1 || number === countPages || currentPage === number || (currentPage + 1) === number || (currentPage - 1) === number || (currentPage === 1 && number === 3)) {
            dotsRendered = false;
            return (
              <button className={`Pagination__content-page${currentPage === number ? ' active' : ''}`}
                      onClick={() => currentPage !== number && changePage(number)} key={number}>{number}</button>
            )
          } else {
            if (!dotsRendered) {
              dotsRendered = true;
              return (<span key={number}>...</span>)
            } else {
              return null;
            }
          }
        })}
      </div>
    </div>
  );
}


export default memo(Pagination);
