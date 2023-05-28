import { memo, useEffect, useState } from "react";
import './style.css';

function Pagionstion({ pageLimit, currentPage, setCurrentPage }) {
    const [neibors, setNeibors] = useState([1, 2, 3]);

    useEffect(() => {
        let arr = [];
        if (currentPage > 3 && currentPage < pageLimit - 2) {
            arr = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', pageLimit];
        }
        else if (currentPage < 3) {
            arr = [1, 2, 3, '...', pageLimit];
        }
        else if (currentPage > pageLimit - 2) {
            arr = [1, '...', pageLimit - 2, pageLimit - 1, pageLimit]
        }
        else if (currentPage === 3) {
            arr = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, '...', pageLimit]
        }
        else if (currentPage === pageLimit - 2) {
            arr = [1, '...', currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
        }
        setNeibors([...arr]);
    }, [currentPage, pageLimit])


    return (
        <div className='Pagination'>
            {neibors.map((item, index) => (
                <button key={index} className={'Pagination-btn' + (item === currentPage ? ' active' : '')} disabled={item === '...'}
                    onClick={() => setCurrentPage(item)}>{item}</button>
            ))}
        </div>
    );
}

export default memo(Pagionstion);
