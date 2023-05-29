import React from "react";
import './style.css'
import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from 'prop-types';

function Pagination({currentPage, totalPages, onChangeCurrentPage}) {

    const cn = bem('Pagination')
    
    return (
		totalPages > 0 &&
		<div className={cn()}>
			{
				currentPage > 1 &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(1)}>
                    1
                </button>
			}
			{
				currentPage > 3 && totalPages > 4 &&
				<div className={cn('dots')}>
                    ...
                </div>
			}
			{
				currentPage === totalPages && totalPages > 3 &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(currentPage - 2)}>
                    {currentPage - 2}
                </button>
			}
			{
				currentPage > 2 &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(currentPage - 1)}>
                    {currentPage - 1}
                </button>
			}
			 <button className={cn('button') + ' ' + cn('button_active')}>
                {currentPage}
            </button>
			{
				totalPages - currentPage > 1 &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(currentPage + 1)}>
                    {currentPage + 1}
                </button>
			}
			{
				currentPage === 1 && totalPages > 3 &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(currentPage + 2)}>
                    {currentPage + 2}
                </button>
			}
			{
				totalPages - currentPage > 2 && totalPages > 4 &&
				<div className={cn('dots')}>
                    ...
                </div>
			}
			{
				totalPages > currentPage &&
				<button className={cn('button')} onClick={() => onChangeCurrentPage(totalPages)}>
                    {totalPages}
                </button>
			}
		</div>
	)
}

Pagination.propTypes = {
	totalPages: PropTypes.number,
	currentPage: PropTypes.number,
	onChangeCurrentPage: PropTypes.func
};

Pagination.defaultProps = {
	onChangeCurrentPage: () => { },
}

export default memo(Pagination);