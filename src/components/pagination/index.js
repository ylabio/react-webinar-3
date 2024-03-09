import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Pagination({ count, currentPage, onPageChange }) {
	const cn = bem('Pagination');
	const pageCount = Math.ceil(count / 10);

	const renderPages = () => {
		const pageElements = [];
		const visiblePages = 3;

		let startPage = Math.max(1, currentPage - 1);
		let endPage = Math.min(startPage + visiblePages - 1, pageCount);

		if (endPage - startPage < visiblePages - 1) {
			startPage = Math.max(1, endPage - visiblePages + 1);
		}

		if (startPage > 1) {
			pageElements.push(
				<button
					key={1}
					className={cn('btn')}
					onClick={() => onPageChange(1)}
				>
					{1}
				</button>
			);
			if (startPage > 2) {
				pageElements.push(<span key="startDots">...</span>);
			}
		}

		for (let i = startPage; i <= endPage; i++) {
			pageElements.push(
				<button
					key={i}
					className={cn('btn', { active: currentPage === i })}
					onClick={() => onPageChange(i)}
				>
					{i}
				</button>
			);
		}

		if (endPage < pageCount) {
			if (endPage < pageCount - 1) {
				pageElements.push(<span key="endDots">...</span>);
			}
			pageElements.push(
				<button
					key={pageCount}
					className={cn('btn')}
					onClick={() => onPageChange(pageCount)}
				>
					{pageCount}
				</button>
			);
		}

		return pageElements;
	};

	return (
		<div className={cn()}>
			{renderPages()}
		</div>
	);
}

Pagination.propTypes = {
	pageCount: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default memo(Pagination);