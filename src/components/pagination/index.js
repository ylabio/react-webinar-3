import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

const renderPagination = (currentPage, totalPages, onChangePage, cn) => {

    const pages = [];

    for (let i = 1; i <= totalPages; i++) {

        if (
            i === 1 ||
            i === totalPages ||
            currentPage === 1 && i === 3 ||
            currentPage === totalPages && i === totalPages - 2
        ) {
            pages.push(
                <button
                    key={i}
                    className={cn(i === currentPage ? 'current' : 'item')}
                    onClick={() => {
                        onChangePage(i);
                    }}
                >
                    {i}
                </button>
            );
            continue;
        }

        if (i === currentPage - 1 || i === currentPage || i === currentPage + 1) {
            pages.push(
                <button
                    key={i}
                    className={cn(i === currentPage ? 'current' : 'item')}
                    onClick={() => {
                        onChangePage(i);
                    }}
                >
                    {i}
                </button>
            );
            continue;
        }

        if (
            i === currentPage - 2 ||
            i === currentPage + 2 ||
            currentPage === 1 && i === 4 ||
            currentPage === totalPages && i === totalPages - 3
        ) {
            pages.push(<span key={i} className={cn('item')}>{'...'}</span>);
            continue;
        }
    }

    return pages;
}

function Pagination({totalPages, currentPage, onChangePage}) {

    const cn = bem('Pagination');

    return (
        <div className={cn()}>
            <div className={cn('container')}>
                {renderPagination(currentPage, totalPages, onChangePage, cn)}
            </div>
            
        </div>
    );
}

Pagination.propTypes = {
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    onChangePage: PropTypes.func
}

Pagination.defaultProps = {
    totalPages: 0,
    currentPage: 0,
    onChangePage: () => {}
}

export default memo(Pagination);