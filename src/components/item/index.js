import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

	const callbacks = {
		onDelete: (e) => {
			e.stopPropagation();
			props.onDelete(props.item.code);
		},
		onAddToCart: (e) => {
			e.stopPropagation();
			props.onAdd(props.item);
		},
	};

	return (
		<div className="Item">
			<div className="Item-code">{props.item.code}</div>
			<div className="Item-title">{props.item.title}</div>
			<span className="Item-price">{props.item.price} ₽</span>
			{props.showCart && (
				<div className="Item-count">{props.item.count} шт</div>
			)}
			<div className="Item-actions">
				{!props.showCart && (
					<button onClick={callbacks.onAddToCart}>Добавить</button>
				)}
				{props.showCart && (
					<button onClick={callbacks.onDelete}>Удалить</button>
				)}
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
	onDelete: PropTypes.func,
	onAddToCart: PropTypes.func,
	showCart: PropTypes.bool,
};

Item.defaultProps = {
	onDelete: () => {},
	onAddToCart: () => {},
	showCart: false,
};

export default React.memo(Item);
