import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {formatPrice} from '../../utils';
import './style.css';

function ItemCart(props) {
	const callbacks = {
		onDelete: (e) => {
			e.stopPropagation();
			props.onDelete(props.item.code);
		},
	};

	return (
		<div className="Item">
			<div className="Item-code">{props.item.code}</div>
			<div className="Item-title">{props.item.title}</div>
			<span className="Item-price">
				{formatPrice(props.item.price)} &#8381;
			</span>
			<div className="Item-count">{props.item.count} шт</div>
			<div className="Item-actions">
				<button onClick={callbacks.onDelete}>Удалить</button>
			</div>
		</div>
	);
}

ItemCart.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	onDelete: PropTypes.func,
};

ItemCart.defaultProps = {
	onDelete: () => {},
};

export default React.memo(ItemCart);
