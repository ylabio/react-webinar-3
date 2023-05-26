import React, {memo} from 'react';
import './style.css';
import PropTypes from 'prop-types';


function Pagination({currentPage, setCurrentPage, totalPages}) {
    const pages = [];

    if (currentPage === 1 || currentPage === 2) {
        pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage === 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1,'...', totalPages);
    }
    
    return (
        <div>
            <ul className='Pagination'>
                {
                    pages.map(page => {
                        <li className='Pagination-simple' key={page} onClick={(e) => setCurrentPage(page)}>{page}</li>
                    })
                }
            </ul>
        </div>
    );
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    totalPages: PropTypes.number
}

Pagination.defaultProps = {
	// currentPage: 1,
	// totalPages: 25,
	setCurrentPage: () => {},
}

export default memo(Pagination);