import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../utils';
import './style.css';

function Item(props) {
	const callbacks = {
		onAddToCart: (e) => {
			e.stopPropagation();
			props.onAdd(props.item);
		},
	};

	return (
		<div className="Item">
			<div className="Item-code">{props.item.code}</div>
			<div className="Item-title">{props.item.title}</div>
			<span className="Item-price">
				{formatPrice(props.item.price)} &#8381;
			</span>
			<div className="Item-actions">
				<button onClick={callbacks.onAddToCart}>Добавить</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	onAddToCart: PropTypes.func,
};

Item.defaultProps = {
	onAddToCart: () => {},
};

export default React.memo(Item);
