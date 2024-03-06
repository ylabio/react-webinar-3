import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Head({title, showCart, onShowCart}) {
	return (
		<div className="Head">
			<h1>{title}</h1>
			{showCart && <button onClick={() => onShowCart(false)}>Закрыть</button>}
		</div>
	);
}

Head.propTypes = {
	title: PropTypes.node,
	showCart: PropTypes.bool,
	onShowCart: PropTypes.func,
};

export default React.memo(Head);
