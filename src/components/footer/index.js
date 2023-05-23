import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Footer({ total }){
	return (
		<div className='Footer'>
			{ `Итого ${ total } ₽` }
		</div>
	)
}

Footer.propTypes = {
	total: PropTypes.number
};

Footer.defaultProps = {
	total: 0
}

export default React.memo(Footer);
