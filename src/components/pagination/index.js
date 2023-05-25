import React from 'react';
import './style.css';
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";

const Pagination = ({countMax, limit, skip, nextPage, prevPage, goToFirstPage, goToLastPage, prevTwoPage, nextTwoPage}) => {

  //страниц максимум общее количество товара/ 10 округлить в большую сторону
  let pageCount = Math.ceil(countMax / limit)
  let activePage = Math.ceil(skip / limit + 1)
  let firstPage = 1
  let lastPage = pageCount
  let beforePage = activePage - 1;
  let afterPage = activePage + 1;


  return (
    <div className='Pagination'>
      {activePage > 2 && <div className='page' onClick={goToFirstPage}>{firstPage}</div>}
      {activePage > 3 && <div className='dotBlock'>...</div>}
      {activePage === pageCount && <div className='page' onClick={prevTwoPage}>{pageCount - 2}</div>}
      {activePage > 1 && <div className='page' onClick={prevPage}>{beforePage}</div>}
      <div className='activePage page'>{activePage}</div>
      {activePage < (pageCount - 1) && <div className='page' onClick={nextPage}>{afterPage}</div>}
      {activePage === 1 && <div className='page' onClick={nextTwoPage}>{activePage + 2}</div>}
      {activePage < (pageCount - 2) && <div className='dotBlock'>...</div>}
      {activePage < pageCount && <div className='page' onClick={goToLastPage}> {lastPage}</div>}
    </div>
  );
};

export default Pagination;

Pagination.propTypes = {
  countMax: PropTypes.number,
  limit: PropTypes.number,
  skip: PropTypes.number,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  goToFirstPage: PropTypes.func,
  goToLastPage: PropTypes.func,
  prevTwoPage: PropTypes.func,
  nextTwoPage: PropTypes.func,
}

Pagination.defaultProps = {
  nextPage: () => {},
  prevPage: () => {},
  goToFirstPage: () => {},
  goToLastPage: () => {},
  prevTwoPage: () => {},
  nextTwoPage: () => {},
}