import React from 'react';
import './style.css';
import PropTypes from "prop-types";


function Pagination(props) {

  const pageNumbers = [];
  const pageCount = Math.ceil(props.totalItems / props.itemsPerPage)

  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }
  return (
      <ul className='Pagination'>
        {pageNumbers.map(number => {
          
          if (number === 1 ||
            number === pageCount ||
            (number >= props.currentPage - 1 && number <= props.currentPage + 1)
            || (props.currentPage === 1 && number === 3) || 
            (props.currentPage === pageCount && number === pageCount-2)) {
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

Pagination.propTypes = {
  totalItems: PropTypes.number,
  itemsPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  isLoading: PropTypes.bool,
  paginate: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  paginate: () => {},
};


export default React.memo(Pagination);