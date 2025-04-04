import React, { useState } from 'react';
import "./style.css"
import { generateRandomKey } from "../../utils";

function Pagination({ totalItems, itemsPerPage = 10, siblingCount = 1, setCurrentPage, children }) {
  const [currentPage, setCurrentPageState] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginationRange = usePaginationRange(totalPages, currentPage, siblingCount);

  return (
    <div  className="Pagination">
      {children}
      <ul className="Pagination-ui">
        { paginationRange.map( ( pageNumber ) => {
          if ( pageNumber === 'DOTS' ) {
            return <li key={ generateRandomKey( 9 ) }>...</li>;
          }

          return (
            <li key={ generateRandomKey( 9 ) }>

              <button
                className={ currentPage === pageNumber ? 'active' : '' }
                onClick={ () => {
                  setCurrentPageState( pageNumber );
                  setCurrentPage( pageNumber );
                } }
              >
                { pageNumber }
              </button>
            </li>
          );
        } ) }
      </ul>
    </div>
  );
}

function usePaginationRange( totalPages, currentPage, siblingCount ) {
  const DOTS = 'DOTS';

  if ( totalPages <= 2 * siblingCount + 3 ) {
    // Если общее количество страниц меньше или равно максимальному количеству видимых страниц
    return Array.from( { length: totalPages }, ( _, i ) => i + 1 );
  }

  if ( currentPage <= siblingCount + 1 ) {
    // Если текущая страница близка к началу
    return [
      ...Array.from( { length: 2 * siblingCount + 1 }, ( _, i ) => i + 1 ),
      DOTS,
      totalPages,
    ];
  }

  if ( currentPage + siblingCount >= totalPages ) {
    // Если текущая страница близка к концу
    return [
      1,
      DOTS,
      ...Array.from({ length: 2 * siblingCount + 1 }, (_, i) => totalPages - 2 * siblingCount + i),
    ];
  }

   const prevDots = function () {
    if (currentPage !== 3) {
      return [1, DOTS]
    }
    return [1]
   };
  const lastDots = function () {
    if (currentPage !== totalPages - 2) {
      return [DOTS, totalPages]
    }
    return [totalPages]
  };

  // В других случаях
  return [
    ...prevDots(),
    currentPage - 1,
    currentPage,
    currentPage + 1,
    ...lastDots()
  ];
}



export default Pagination;
