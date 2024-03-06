import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import ItemCart from '../item-cart';

function List({list, showCart, onDeleteItem, onAddToCart}) {
	return (
		<div className="List">
			{list.map((item) => (
				<div key={item.code} className="List-item">
					{!showCart ? (
						<Item item={item} onAdd={onAddToCart} />
					) : (
						<ItemCart item={item} onDelete={onDeleteItem} />
					)}
				</div>
			))}
		</div>
	);
}

List.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
		})
	).isRequired,
	onDeleteItem: PropTypes.func,
	onAddToCart: PropTypes.func,
  showCart: PropTypes.bool,
};

List.defaultProps = {
	onDeleteItem: () => {},
	onAddToCart: () => {},
  showCart: false,
};

export default React.memo(List);
