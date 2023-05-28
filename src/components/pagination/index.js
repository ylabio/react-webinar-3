import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css'
import { cn as bem } from '@bem-react/classname';


const Pagination = ({ onSelect, currentPage }) => {
    
    const cn = bem('Pagination');
    
    const numPages = {
        1: [1, 2, 3, '...', 55],
        2: [1, 2, 3, '...', 55],
        3: [1, 2, 3, 4, '...', 55],
        'page': [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', 55],
        53: [1, '...', 52, 53, 54],
        54: [1, '...', 53, 54, 55],
        55: [1, '...', 53, 54, 55],
    }

    const getNumPages = (page) => {
        if (page < 3) return numPages[1];
        if (page == 3) return numPages[3];
        if (page == 53) return numPages[53];
        if (page == 55) return numPages[55];
        if (page == 54) return numPages[54];
        if (page > 3 && page < 53) return numPages['page'];
    }
    
    let pages = getNumPages(currentPage);
    const handleClick = (e) => onSelect(e.target.value)

    return (
        <div className={cn('row')}>
            {pages && pages.map((btn, index) =>
                <div key={index} >
                    {btn == '...' ?
                        <span className={cn('dots')}>...</span>
                        :
                        <button className={currentPage == btn ? cn('btn', { selected: true }) : cn('btn')} onClick={handleClick} value={btn}>{btn}</button>
                    }
                </div>
            )}
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number,
    onSelect: PropTypes.func,
};

Pagination.defaultProps = {
    onSelect: () => { }
}

export default memo(Pagination);