import React from 'react';
import './style.css';
import PageNumber from '../page-number';
import useSelector from '../../store/use-selector';

function Pagination() {
  const select = useSelector((state)=> ({
    paginationArray: state.pagination.paginationArray
  }));
  return(
    <div className="Pagination">
      <ul className="Pagination-list">
      {select.paginationArray.map((page, index) => {
        if (typeof page === 'number') {
          return <PageNumber key={`page-button_component_${page}_${index}`} number={page} />
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
