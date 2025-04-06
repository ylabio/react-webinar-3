import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Pagination({ currentPage, totalPages, visiblePages = 3, onPageChange }) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const start = Math.max(2, currentPage - Math.floor(visiblePages / 2));
        const end = Math.min(totalPages - 1, currentPage + Math.floor(visiblePages / 2));

        pageNumbers.push(1);

        if (start > 2) {
            pageNumbers.push('...');
        }

        for (let i = start; i <= end; i++) {
            pageNumbers.push(i);
        }

        if (end < totalPages - 1) {
            pageNumbers.push('...');
        }

        if (totalPages > 1) {
            pageNumbers.push(totalPages);
        }

        return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    const handleClick = (pageNumber) => {
        if (typeof pageNumber === 'number' && onPageChange) {
            onPageChange(pageNumber);
        }
    }

    return (
        <div className="pagination">
            {pageNumbers.map((pageNumber, index) => (
                <button
                    key={index}
                    className={`pagination-button ${pageNumber === currentPage ? 'active' : ''}`}
                    onClick={() => handleClick(pageNumber)}
                    disabled={typeof pageNumber === 'string'} // Отключение кнопок с многоточием
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    visiblePages: PropTypes.number,
    onPageChange: PropTypes.func.isRequired,
}

export default Pagination;