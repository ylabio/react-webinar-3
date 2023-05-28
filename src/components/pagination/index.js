import React, {memo, setState} from 'react';
import './style.css';
import PropTypes from 'prop-types';


function Pagination({currentPage, setCurrentPage, totalPages}) {
    const pages = [];
    let counter = 0;

    if (currentPage === 1 || currentPage === 2) {
        pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage === 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else if (currentPage === totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
    } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    } 

    function uniqMaker(page) {
        counter++;
        return counter + page;
    }

    const listItems = pages.map((page) => 
    (page === currentPage) ?
    (<li key={page}><a className='Pagination-current' href='!#'  onClick={() => setCurrentPage(page)}>{page}</a></li>) :
    (page !== '...') ? 
        (<li key={page}><a className='Pagination-simple' href='!#'  onClick={() => setCurrentPage(page)}>{page}</a></li>) :
        (<li key={uniqMaker(page)}><div className='Pagination-simple'>{page}</div></li>)
    );

    return (
        <div className='Pagination'>
            <ul className='Pagination-list'>{listItems}</ul>
        </div>
    );
    
}

Pagination.propTypes = {
    currentPage: PropTypes.number,
    setCurrentPage: () => {},
    // totalPages: PropTypes.number
}

Pagination.defaultProps = {
	setCurrentPage: () => {},
}

export default memo(Pagination);