import {memo, useState} from "react";
import PropTypes from 'prop-types';
import './style.css';
import useSelector from "../../store/use-selector";

function Pagination({ total, limit, onPageChange, currentPage}) {
  const countPages = Math.ceil(total/limit);
  const pages = [];
  //const pages = total.slice(0, 10);
  for (let i = 1; i <= countPages; i++) {
    pages.push(i);
  };

  const onPageClick = (event) => {
    event.stopPropagation();
    onPageChange(event.target.innerHTML);
  };

  return (
    <div className='Pagination'>
      {
      pages.map(item =>
        <div onClick={onPageClick}
          // key={item} className='Pagination-item'>
          key={item} className={`Pagination-item ${currentPage === item ? 'Pagination-item-active' : ''}`}>
          {item}
        </div>
      )}
    </div>
  )
}

export default memo(Pagination);
