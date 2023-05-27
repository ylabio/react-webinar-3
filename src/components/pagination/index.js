import React, {memo, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Pagination({pageCount, activePage, setActivePage}) {
	const cn = bem('Pagination');
	
	const [showPage, setShowPage] = useState(2);
	
	return (
		<div className={cn()}>
			<div id={1} className={activePage === 1 ? cn('active') : cn('item')}
			     onClick={(e) => {
				     setActivePage(1);
				     setShowPage(2);
			     }}
			>1
			</div>
			{activePage > 3 && pageCount > 4 && <div className={cn('ellipsis')}>...</div>}
			{showPage > 2 && <div id={showPage - 1} className={activePage === (showPage - 1) ? cn('active') : cn('item')}
			     onClick={(e) => {
				     setActivePage(showPage - 1);
				     setShowPage(showPage - 1);
			     }}
			>{showPage - 1}</div>}
			{pageCount > 2 && <div id={showPage} className={activePage === showPage ? cn('active') : cn('item')}
			     onClick={(e) => {
				     setActivePage(showPage);
				     setShowPage(showPage);
			     }}
			>{showPage}</div>}
			{showPage < (pageCount - 1) && <div id={showPage + 1} className={activePage === (showPage + 1) ? cn('active') : cn('item')}
			     onClick={(e) => {
				     setActivePage(showPage + 1);
				     setShowPage(showPage + 1);
			     }}
			>{showPage + 1}</div>}
			{activePage < (pageCount - 2) && pageCount > 4 && <div className={cn('ellipsis')}>...</div>}
			{pageCount > 1 && <div id={pageCount} className={activePage === pageCount ? cn('active') : cn('item')}
			                       onClick={(e) => {
				                       setActivePage(pageCount);
				                       setShowPage(pageCount - 1);
			                       }}
			>{pageCount}</div>}
		</div>
	)
}

Pagination.propTypes = {
	pageCount: propTypes.number.isRequired,
	activePage: propTypes.number.isRequired,
	setActivePage: propTypes.func.isRequired,
}

Pagination.defaultProps = {
	pageCount: 1,
	activePage: 1,
	setActivePage: () => {
	},
}

export default memo(Pagination);