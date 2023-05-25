import React from 'react';
import './style.css';
import useSelector from "../../store/use-selector";
import PropTypes from "prop-types";

const Pagination = ({countMax, limit, skip, nextPage, prevPage, goToFirstPage, goToLastPage}) => {

  //страниц максимум общее количество товара/ 10 округлить в большую сторону
  let pageCount = Math.ceil(countMax / limit)
  let activePage = Math.ceil(skip / limit + 1)
  let firstPage = 1
  let lastPage = pageCount
  let beforePage = activePage - 1;
  let afterPage = activePage + 1;


  return (
    <div className='Pagination'>
      <div className='page' onClick={goToFirstPage}>{firstPage}</div>
      <div className='page'>...</div>
      <div className='page' onClick={prevPage}>{beforePage}</div>
      <div className='activePage page'>{activePage}</div>
      <div className='page' onClick={nextPage}>{afterPage}</div>
      <div className='page'>...</div>
      <div className='page' onClick={goToLastPage}> {lastPage}</div>
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
}

Pagination.defaultProps = {
  nextPage: () => {},
  prevPage: () => {},
  goToFirstPage: () => {},
  goToLastPage: () => {},
}