import React, {memo} from "react";
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname'


function PaginationButtons ({totalPages, aroundPages = 1 , currentPage , onChangePage = ()=>{},}){
    const cn = bem("Pagination")
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
            <ul className={cn()}>
            {pages.map((page, index) => (
                <li key={index}>
                    {(page === '...' ) ? (<span className={cn("dots")}>...</span>) : 
                    (<button value={page} onClick={onChangePage} disabled={page === currentPage} className={`Pagination-item ${page === currentPage ? 'active' : ''}`}>{page}</button>) }
                </li>
            ))}
            </ul>
        </div>
    )
}

PaginationButtons.propTypes = {
    totalPages: PropTypes.number,
    aroundPages: PropTypes.number,
    currentPage: PropTypes.number,
  onChangePage: PropTypes.func,
};

export default memo(PaginationButtons)