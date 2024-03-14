import React from 'react';
import PageNumber from '../page-number';
import { generatePagination } from '../../utils';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({currentPage, totalArticles, changePage}) {
  const paginationArray = generatePagination(currentPage, totalArticles, 10);
  console.log(paginationArray);
  return(
    <div className="Pagination">
      <ul className="Pagination-list">
      {paginationArray.map((page, index) => {
        if (typeof page === 'number') {
          return (
            <PageNumber
              key={`page-button_component_${page}_${index}`}
              number={page}
              currentPage={currentPage}
              changePage={changePage}
            />
          )
        } else {
          return (
            <li className='Pagination-blank' key={`page_blank_${index}`}>
              ...
            </li>
          )
        }
      })}
      </ul>
    </div>
  )
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalArticles: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
};

export default React.memo(Pagination);
