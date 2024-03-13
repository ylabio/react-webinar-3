import { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';
function Pagination({ currentPage, lastPage, goToPage }) {
    const delta = 1; 
    const range = [];

    if (lastPage > 1) {
        range.push(1); 

        let startPage, endPage;

        if (currentPage <= 3) {
            startPage = 2;
            endPage = 4;
        } else if (currentPage > lastPage - 3) {
            startPage = lastPage - 3;
            endPage = lastPage - 1;
        } else {
            startPage = currentPage - delta;
            endPage = currentPage + delta;
        }

        if (startPage > 2) {
            range.push('...'); 
        }

        for (let i = startPage; i <= endPage; i++) {
            if (i < lastPage) {
                range.push(i); 
            }
        }

        if (endPage < lastPage - 1) {
            range.push('...'); 
        }

        if (range[range.length - 1] !== lastPage) {
            range.push(lastPage); 
        }
    }

    const renderPageNumbers = range.map((number, index) => {
        let buttonClass = 'pagination-button';
        if (currentPage === number) {
            buttonClass += ' disabled';
        }

        return (
            <button
                key={index} 
                className={buttonClass}
                onClick={() => number !== '...' && goToPage(number)}
                disabled={currentPage === number || number === '...'}
            >
                {number}
            </button>
        );
    });


    return (
        <div className="pagination-container">
            {renderPageNumbers}
        </div>
    );
}
export default Pagination