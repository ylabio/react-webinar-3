import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Item(props) {

	let price = props.item.price;

	const callbacks = {
		onAddItem: (e) => {
			e.stopPropagation();
			props.onAddItem(props.item.code);
		},
	};

	return (
		<div className="Item">
			<div className="Item-code">{props.item.code}</div>
			<div className="Item-title">{props.item.title}</div>
			<div className="Item-price">{props.store.getFormatedPrice(price)} ₽</div>
			<div className="Item-actions">
				<button onClick={callbacks.onAddItem}>Добавить</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		selected: PropTypes.bool,
		count: PropTypes.number,
	}).isRequired,
	onAddItem: PropTypes.func,
};

Item.defaultProps = {
	onAddItem: () => {},
};

export default React.memo(Item);
