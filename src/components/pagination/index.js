import React, {memo} from 'react'
import { pageResultNumber } from '../../utils';
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css'


function Pagination({page, lastPage, handleClickPage}) {

  const cn = bem('Pagination');
  const pageNumbersList = pageResultNumber(page, lastPage)
  
  return (  
    <div className={cn()}>
      {page > 0 ? (
        <div className={1 === page ? cn('active') : cn('number')} onClick={() => handleClickPage(1)}>1</div>
      ) : ''}
      {pageNumbersList.map((item, index) => (
        item === '...' ? <div className={cn('text')} key={index}>... </div> : <div className={item === page ? cn('active') : cn('number')} key={index} onClick={() => handleClickPage(item)}>{item}</div>
      ))}
      <div className={lastPage === page ? cn('active') : cn('number')} onClick={() => handleClickPage(lastPage)}>{lastPage}</div>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.number,
  lastPage: PropTypes.number,
  handleClickPage: PropTypes.func
};

Pagination.defaultProps = {
  handleClickPage: () => {},
}

export default memo(Pagination)