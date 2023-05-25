import React from 'react';
import './style.css';

const Pagination = () => {

  //страниц максимум общее количество товара/ 10 округлить в большую сторону
  let pageCount = Math.ceil(101 / 10)
  let pages = []
  // let beforePage = activePage - 1; //4
  // let afterPage = activePage + 1; //5


  for (let i = 0; i <= pageCount; i++) {
    pages.push(i)
  }


  return (
    <div className='Pagination'>
      {pages.map(p => {
        let activePage = 5 === p ? 'activePage page' : 'page'
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