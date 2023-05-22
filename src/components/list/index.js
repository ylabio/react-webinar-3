import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ children }) {

	return (
		<ul className='List list-reset'>
			{children}
		</ul>
	)
}


List.propTypes = {
	children: PropTypes.node
}


export default React.memo(List);
