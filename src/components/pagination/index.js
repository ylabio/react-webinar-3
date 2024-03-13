import React from "react";
import { getPageNumbers } from "../../utils";
import './style.css'

function Pagination(props) {

  function getPages(page, lastPage) {
    const result = getPageNumbers(page, lastPage);

    return result.map((item, index) => {
      switch (item) {
        case '...':
          return <span key={item + index} className='Pagination-dots'>{item}</span>
        case props.currentPage:
          return <span key={item} id={item} className='Pagination-selected'>{item}</span>
        default:
          return <span key={item} className='Pagination-page'
            onClick={() => !props.isLoading && props.onClick(item)}
            id={item}>
            {item}
          </span>
      }
    })
  }

  return (
    <div className='Pagination'>
      {getPages(props.currentPage, props.lastPage)}
    </div>
  );
}

export default React.memo(Pagination);
