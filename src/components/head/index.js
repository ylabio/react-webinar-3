import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

const Head = ({ title }) => {
	console.log('Head');

	return (
		<div className="Head">
			<h1>{title}</h1>
		</div>
	);
};

Head.propTypes = {
	title: PropTypes.string,
};

export default React.memo(Head);
