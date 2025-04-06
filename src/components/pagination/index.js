import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Pagination({ 
    productCount,
    currentPage,
    productsPerPage,
    onDisplayProducts = () => {},
    onPageChange = () => {},
}) {
    const cn = bem('Pagination');
    const totalPages = Math.ceil(productCount / productsPerPage);

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages < 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage < 3) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
                return pageNumbers;
            }
            if (currentPage === 3) {
                pageNumbers.push(1, 2, 3, 4);
                if (totalPages < 6) {
                    pageNumbers.push(totalPages);
                    return pageNumbers;
                } else {
                    pageNumbers.push('...', totalPages);
                    return pageNumbers;
                }  
            }

            if (currentPage >= totalPages - 3) {
                if (currentPage === totalPages - 2) {
                    pageNumbers.push(1, '...', totalPages-3, totalPages-2, totalPages-1, totalPages);
                    return pageNumbers;
                }
                if (currentPage === totalPages - 3) {
                    pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    return pageNumbers;
                }
                pageNumbers.push(1, '...', totalPages-2, totalPages-1, totalPages);
                return pageNumbers;
            } else if (currentPage < totalPages - 3) {
                if (currentPage >= 4) {
                    pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
                    return pageNumbers;
                }
            }
        }
        return pageNumbers;
    };

    return (
        <div className={cn()}>
            <select className={cn('selector')} onChange={e => onDisplayProducts(Number(e.target.value))}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        
            <ul className={cn('list')}>
                {getPageNumbers().map((number, index) => (
                    <li
                        key={index}
                        onClick={() => typeof number === 'number' 
                            && onPageChange(number)}
                        className={cn('item') + 
                            (number === currentPage ? '_selected' : '') + (number === '...' ? '_dots' : '')}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;