import React, { useState } from 'react';
import './style.css';
import useStore from '../../store/use-store';
import { useEffect } from 'react';
import { cn as bem } from '@bem-react/classname';

function Pagination({ postsPerPage, totalPosts, totalPages }) {
    const cn = bem('Pagination');
    const store = useStore();
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const skip = currentPage !== 1 ? currentPage * postsPerPage : 0;
    postsPerPage = limit;

    useEffect(() => {
        store.actions.catalog.load(postsPerPage, skip);
    }, [currentPage, postsPerPage]);

    const handleChangeLimit = (e) => {
        const limit = e.target.value;
        // setCurrentPage(1);
        setLimit(limit);
        // store.actions.catalog.load(selectedPostsPerPage, skip);
    }

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages < 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage < 3) {
                pageNumbers.push(1, 2, 3);
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
                return pageNumbers;
            }
            if (currentPage === 3) {
                pageNumbers.push(1, 2, 3, 4);
                if (totalPages < 6) {
                    pageNumbers.push(totalPages);
                    return pageNumbers;
                } else {
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                    return pageNumbers;
                }  
            }

            if (currentPage >= totalPages - 3) {
                if (currentPage === totalPages - 2) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    // pageNumbers.push(currentPage);
                    pageNumbers.push(totalPages-3, totalPages-2, totalPages-1, totalPages);
                    return pageNumbers;
                }
                if (currentPage === totalPages - 3) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    pageNumbers.push(currentPage - 1);
                    pageNumbers.push(currentPage);
                    pageNumbers.push(currentPage + 1);
                    pageNumbers.push('...', totalPages);
                    return pageNumbers;
                }
                pageNumbers.push(1);
                pageNumbers.push('...');
                // pageNumbers.push(currentPage);
                pageNumbers.push(totalPages-2, totalPages-1, totalPages);
                return pageNumbers;
            } else if (currentPage < totalPages - 3) {
                if (currentPage >= 4) {
                    pageNumbers.push(1);
                    pageNumbers.push('...');
                    pageNumbers.push(currentPage - 1);
                    pageNumbers.push(currentPage);
                    pageNumbers.push(currentPage + 1);
                    pageNumbers.push('...');
                    pageNumbers.push(totalPages);
                    return pageNumbers;
                }
            }
            // if (currentPage <= totalPages - 3) {
            //     if (currentPage >= 8) {
            //         pageNumbers.push(1);
            //         pageNumbers.push('...');
            //         pageNumbers.push(currentPage);
            //         pageNumbers.push(totalPages-1, totalPages);
            //         return pageNumbers;
            //     }
            //     // pageNumbers.push(1);
            //     // pageNumbers.push('...');
            //     // pageNumbers.push(currentPage);
            //     // pageNumbers.push(totalPages-2, totalPages-1, totalPages);
            //     return pageNumbers;
            // }
        
            // if (currentPage >= 4) {
            //     pageNumbers.push(1);
            //     pageNumbers.push('...');
            //     pageNumbers.push(currentPage - 1);
            //     pageNumbers.push(currentPage);
            //     pageNumbers.push(currentPage + 1);
            //     pageNumbers.push('...');
            //     pageNumbers.push(totalPages);
            //     return pageNumbers;
            // }
            
            
        }
        
        // Если общее число страниц меньше или равно 3, отображаем все
        // if (totalPages <= 4) {
        //     for (let i = 1; i <= totalPages; i++) {
        //         pageNumbers.push(i);
        //     }
        // } else {
        //     if (currentPage > 3) {
        //         pageNumbers.push(1);
        //         pageNumbers.push('...');

        //         const start = Math.max(2, currentPage - 1);
        //         const end = Math.min(totalPages - 1, currentPage + 1);

        //         for (let i = start; i <= end; i++) {
        //             pageNumbers.push(i);
        //         }
        //         if (end < totalPages - 1) {
        //             pageNumbers.push('...');
        //         }
        //         pageNumbers.push(totalPages);
        //     } else {
        //         for (let i = 1; i <= 3; i++) {
        //             pageNumbers.push(i);
        //         }
        //         if (totalPages > 3) {
        //             pageNumbers.push('...');
        //             pageNumbers.push(totalPages);
        //         }
        //     }
        // }

        return pageNumbers;
    };

    return (
        <div className={cn()}>
            <select className={cn('selector')} onChange={handleChangeLimit}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
        
            <ul className={cn('list')}>
                {getPageNumbers().map((number, index) => (
                    <li
                        key={index}
                        onClick={() => typeof number === 'number' && handlePageChange(number)}
                        // style={{
                        //     fontWeight: number === currentPage ? 'bold' : 'normal',
                        //     margin: '0 5px',
                        //     cursor: 'pointer'
                        // }}
                        className={cn('item') + (number === currentPage ? '_selected' : '') + (number === '...' ? '_dots' : '')}
                        disabled={number === '...'}
                    >
                        {number}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Pagination;