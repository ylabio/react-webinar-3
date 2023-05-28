import React from 'react';
import './style.css';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const Pagination = ({
                      countMax,
                      limit,
                      skip,
                      nextPage,
                      prevPage,
                      goToFirstPage,
                      goToLastPage,
                      prevTwoPage,
                      nextTwoPage
                    }) => {

  //страниц максимум общее количество товара/ 10 округлить в большую сторону
  let pageCount = Math.ceil(countMax / limit)
  let activePage = Math.ceil(skip / limit + 1)
  let firstPage = 1
  let lastPage = pageCount
  let beforePage = activePage - 1;
  let afterPage = activePage + 1;

  return (
    <div className='Pagination'>
      {activePage > 2 && <Link className='page' onClick={goToFirstPage} to={`/${firstPage}`}>{firstPage}</Link>}
      {activePage > 3 && <div className='dotBlock'>...</div>}
      {activePage === pageCount && <Link className='page' onClick={prevTwoPage} to={`/${pageCount - 2}`}>{pageCount - 2}</Link>}
      {activePage > 1 && <Link className='page' onClick={prevPage} to={`/${beforePage}`}>{beforePage}</Link>}
      <Link className='activePage page' to={`/${activePage}`}>{activePage}</Link>
      {activePage < (pageCount - 1) && <Link className='page' onClick={nextPage} to={`/${afterPage}`}>{afterPage}</Link>}
      {activePage === 1 && <Link className='page' onClick={nextTwoPage}  to={`/${activePage + 2}`}>{activePage + 2}</Link>}
      {activePage < (pageCount - 2) && <div className='dotBlock'>...</div>}
      {activePage < pageCount && <Link className='page' onClick={goToLastPage} to={`/${lastPage}`}> {lastPage}</Link>}
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
  nextPage: () => {
  },
  prevPage: () => {
  },
  goToFirstPage: () => {
  },
  goToLastPage: () => {
  },
  prevTwoPage: () => {
  },
  nextTwoPage: () => {
  },
}