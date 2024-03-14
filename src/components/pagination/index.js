import {memo, useState,useEffect, useMemo} from "react";
import PropTypes, { number } from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import { Link } from "react-router-dom";


function Pagination({totalItems,number,link, onChangePage}) {
    
    const totalPages = Math.floor(totalItems / 10);


    const getNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        const middleIndex = Math.floor(maxVisiblePages / 2);


        let startPage = Math.max(number - middleIndex, 1);
        let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        if (endPage - startPage + 1 < maxVisiblePages) {
          startPage = Math.max(endPage - maxVisiblePages + 1, 1);
        }
        if (endPage - startPage + 1 < maxVisiblePages) {
          endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
        }
    
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(i);
        }
    
        if (startPage > 2) {
          pageNumbers.unshift('...');
        }
        if (endPage < totalPages - 1) {
          pageNumbers.push('...');
        }
    
        if (!pageNumbers.includes(1)) {
          pageNumbers.unshift(1);
        }
        if (!pageNumbers.includes(totalPages)) {
          pageNumbers.push(totalPages);
        }

        return pageNumbers;
      };
    
      const changePage = (e, pageNumber) => {

        if (pageNumber === "...") {
          e.preventDefault();
          return false;
        }

        else if (pageNumber === number) {
          e.preventDefault();
          return false;
        }
        onChangePage(pageNumber);
      }

    
    
    return (
    <div className="pagination">
        {
            getNumbers().map((pageNumber,index) =>
                <Link className={"pagination-btn " + (pageNumber == number ? "pagination-btn--active":'')} to={`${link}${pageNumber}`} onClick={(e) => changePage(e,pageNumber)} key = {index}>
                    {pageNumber}
                </Link>
            )
        } 
    </div>
    );
}



export default memo(Pagination);