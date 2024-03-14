import React from 'react';
import './style.css';
import PageNumber from '../page-number';
// import useSelector from '../../store/use-selector';
import { generatePagination } from '../../utils';

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

export default React.memo(Pagination);
