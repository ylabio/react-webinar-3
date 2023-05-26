import React from 'react';
import { memo } from "react";
import './style.css';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const renderPageButton = (pageNumber) => {
        const isActive = pageNumber === currentPage;
        return (
            <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={isActive ? 'active' : ''}
            >
                {pageNumber}
            </button>
        );
    };

    const renderPaginationButtons = () => {
        const buttons = [];

        let start;
        let end;

        if (currentPage < 3) {
            start = 2;
            end = 3;
        } else if (currentPage === totalPages) {
            start = currentPage - 2;;
            end = totalPages - 1;
        } else if (currentPage >= totalPages - 2) {
            start = currentPage - 1;
            end = totalPages - 1;
        } else {
            start = currentPage - 1;
            end = currentPage + 1;
        }

        buttons.push(renderPageButton(1));

        if (currentPage > 3) {
            buttons.push(<span key="leftEllipsis">...</span>);
        }

        for (let i = start; i <= end; i++) {
            buttons.push(renderPageButton(i));
        }

        if (currentPage < totalPages - 2) {
            buttons.push(<span key="rightEllipsis">...</span>);
        }

        buttons.push(renderPageButton(totalPages));

        return buttons;
    };

    return (
        <div className='Pagination'>
            {renderPaginationButtons()}
        </div>
    );
};

export default memo(Pagination);
