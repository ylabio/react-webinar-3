import React from 'react';
import './style.css';

const Pagination = () => {

  //страниц максимум общее количество товара/ 10 округлить в большую сторону
  let pageCount = Math.ceil(101 / 10)
  let pages = []
  for (let i = 0; i <= pageCount; i++) {
    pages.push(i)
  }


  return (
    <div className='Pagination'>
      {pages.map(p => {
        let activePage = 1 === p ? 'activePage page' : 'page'
        return <div className={activePage}
                     onClick={(e) => {
                       alert('выбрана страница ')
                       // props.onPgeChanged(p)
                     }}>{p}</div>
      })}


    </div>
  );
};

export default Pagination;