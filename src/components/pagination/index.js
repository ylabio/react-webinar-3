import {memo, useState, useEffect} from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({pagesCount, onChangePage ,currentPage}) {
  const cn = bem('Pagination');

     function getClassName(i) {
      if (currentPage === i+1) {

        return 'chosen_button';
      }
      return '';
     }

  const paginationButton = (i) => {
    return (
     <button key={i + 1} className={`${cn('button')} ${getClassName(i)}`} onClick={() => onChangePage(i+1)}>
       <div key={i + 1} id={`${i + 1}`}>
       {i + 1}
       </div>
     </button>
  )}

  return (
    <div className={cn()}>

      <div className={cn('buttons')}>
      {currentPage > 3  && paginationButton(0)}
        {currentPage < 4  && [0,1,2].map((el) => (
         paginationButton(el)
        ))}
        {currentPage > 3 && ' ... '}
        {currentPage >= 4 && currentPage <= (pagesCount-2) && [currentPage-1, currentPage,currentPage+1].map((el) => (
         paginationButton(el-1)
        ))}
        {currentPage === 3 && paginationButton(3)}
        {currentPage <= (pagesCount-2) && ' ... '}
        {(currentPage === pagesCount-1) && paginationButton(pagesCount-3)}
        {currentPage > (pagesCount-2) && [pagesCount-2,pagesCount-1,pagesCount].map((el) => (
         paginationButton(el)
        ))}
        {currentPage <= (pagesCount-2) && paginationButton(pagesCount)}
      </div>
    </div>
  )
}

Pagination.propTypes = {
  pagesCount: PropTypes.number,
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
};

Pagination.defaultProps = {
  pagesCount: 0,
  onChangePage: () => {},
  currentPage: 0
}

export default memo(Pagination);