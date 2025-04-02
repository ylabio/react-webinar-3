import React from "react";
import PropTypes from 'prop-types';
import './style.css';


function PaginationButtons ({totalPages, aroundPages = 1 , currentPage , onChangePage = ()=>{},}){
    const generateButtons = () =>{
        const pages = [];
        pages.push(1);

        const start = Math.max(2,currentPage - aroundPages);
        const end = Math.min(totalPages - 1, currentPage + aroundPages);
        if (start > 2) pages.push('...');
        
        for (let i = start ; i <= end; i++){
            pages.push(i);
        }

        if (end < totalPages -1 ) pages.push('...');
        if (totalPages > 1) pages.push(totalPages);
        
        return pages; 
    }
    
    const pages = generateButtons();

    return(
        <div>
            <ul className="Pagination">
            {pages.map((page, index) => (
                <li key={index}>
                    {(page === '...' ) ? (<span className="Pagination-dots">...</span>) : 
                    (<button value={page} onClick={onChangePage} disabled={page === currentPage} className={`Pagination-item ${page === currentPage ? 'active' : ''}`}>{page}</button>) }
                </li>
            ))}
            </ul>
        </div>
    )
}

PaginationButtons.propTypes = {
  item: PropTypes.shape({
    totalPages: PropTypes.number,
    aroundPages: PropTypes.number,
    currentPage: PropTypes.number,
}).isRequired,
  onChangePage: PropTypes.func,
};

export default PaginationButtons