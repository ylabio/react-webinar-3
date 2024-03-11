import React, {useState} from 'react';
import './style.css';
import {Link} from "react-router-dom";


function Pagination(props) {
  // const [page, setPage] = useState(1);
  // const resetPage = () => props.paginate(1);

  // const { resetPage } = useContext(PaginationContext);

  const pageNumbers = [];
  const pageCount = Math.ceil(props.totalItems / props.itemsPerPage)

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  // console.log(props.isLoading)
  return (
      <ul className='Pagination'>
        {pageNumbers.map(number => {
          
          if (number === 1 ||
            number === pageCount ||
            (number >= props.currentPage - 1 && number <= props.currentPage + 1)
            || (props.currentPage === 1 && number === 3)) {
              return (
                <li key={number} className={`Pagination-page-item ${number}`}>
                <a onClick={(e) => props.isLoading ? e.preventDefault(): props.paginate(number) } href={`#${number}`} className={`Pagination-page-btn ${number === props.currentPage ? 'active' : ''}`}
                >
                  {number}
                </a>
                </li>
              )} else if (
                number === 2 ||
                number === pageCount - 1
                ) {
                  return <span key={number} className='Pagination-page-space'>...</span>;
                } else {
                  return null;
                }  
         
          })}     
      </ul>
  );
};

export default React.memo(Pagination);