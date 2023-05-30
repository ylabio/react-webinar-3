import React from 'react';
import { getPagesArray } from '../../utils.js';
import './style.css';

export const Pagination = ({ totalPages, changePage, currentPage}) => {
	const pagesArray = getPagesArray(totalPages, currentPage);

	return (
		<div className='Pagination'>
			{pagesArray.map((number,i) => (
				<button
        className={number === "..." ? "Pagination-ellipsis" : `Pagination-btn${number === currentPage  ? " active" : ""}`}
					key={i}
					onClick={() => changePage(number)}>
					 {number === "..." ? "..." : number}
				</button>
			))}
		</div>
	);
};
