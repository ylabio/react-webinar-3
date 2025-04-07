import React from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import PaginationNumbers from '../pagination-numbers';

function Pagination({ 
    productCount,
    currentPage,
    productsPerPage,
    onDisplayProducts = () => {},
    onPageChange = () => {},
}) {
    const cn = bem('Pagination');
    const totalPages = Math.ceil(productCount / productsPerPage);

    return (
        <div className={cn()}>
            <select className={cn('selector')} onChange={e => onDisplayProducts(Number(e.target.value))}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <PaginationNumbers currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
}

export default Pagination;