import React from 'react';
import { memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function PaginationNumbers({ 
    currentPage,
    totalPages,
    onPageChange = () => {},
}) {
    const cn = bem('Pagination');

    const getPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages < 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Добавляем первую страницу
            pageNumbers.push(1);

            // Определяем, нужно ли добавлять многоточие
            if (currentPage > 3) {
                pageNumbers.push('...');
            }

            // Добавляем номера страниц вокруг текущей
            let start = Math.max(2, currentPage - 1);
            let end = Math.min(totalPages - 1, currentPage + 1);;
            // Добавляем условия для отображения трех первых чисел с начала и с конца пагинации
            if (currentPage === 1) {
                end = Math.min(totalPages - 2, currentPage + 2);
            } else if (currentPage === totalPages) {
                start = currentPage - 2;
            }

            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }

            // Добавляем многоточие перед последней страницей, если это необходимо
            if (currentPage < totalPages - 2) {
                pageNumbers.push('...');
            }

            // Добавляем последнюю страницу
            if (totalPages > 1) {
                pageNumbers.push(totalPages);
            }
        };

        return pageNumbers;
    };

    return (
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
    );
}

export default memo(PaginationNumbers);