import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function Pagination({
    currentPage = 1,
    setSkip = () => {}
 }) {
    const getpages = () => {
        const totalpages = 55
        const pagesarray = []
        if (currentPage <= 3) {
            for (let i = 1; i <= 5; i++) {
                pagesarray.push(i)
            }
        } else if (totalpages - currentPage <= 3) {
            for (let i = totalpages - 4; i <= totalpages; i++) {
                pagesarray.push(i)
            }
        } else {
            pagesarray.push(1, '...')
            pagesarray.push(currentPage - 1, currentPage, currentPage + 1)
            pagesarray.push('...', totalpages)
        }
        return pagesarray
    }
  return (
    <div>
        {getpages().map(page => {
            if (typeof page === 'number') {
                return (
                    <button className={currentPage == page ? 'pagination-button active' : 'pagination-button'} onClick={() => setSkip(page)}>{page}</button>
                )
            } else {
                return (<span className='pagination-tripledots'>...</span>)
            }
        })}
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
};

export default memo(Pagination);
