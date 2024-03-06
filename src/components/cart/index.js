import React from "react";
import PropTypes from 'prop-types';
import "./style.css";
import CartItem from "./cart-item";
import { formatPrice } from "../../utils";

function Cart({ list, onDeleteCartItem, totalCartPrice }) {
	if(list.length === 0) {
		return <h3 className="Cart-warning">Корзинка пуста!</h3>;
	}

	const totalCartPriceContent = `${formatPrice(totalCartPrice)} ₽`;

	return (
		<>
			<ul className="Cart-list">
				{list.map((item, index) => 
					<CartItem key={index} id={ index + 1 } itemData={item} onDelete={() => { onDeleteCartItem(item.code) }}/>
					)}
			</ul>

			<p className="Cart-total">
				Итого <span>{totalCartPriceContent}</span>
			</p>
		</>
	);
}

Cart.propTypes = {
  onDeleteCartItem: PropTypes.func,
	list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
		price: PropTypes.number
  })),
	totalCartPrice: PropTypes.number
};

Cart.defaultProps = {
  onDeleteCartItem: () => {},
	totalCartPrice: 0
}

export default React.memo(Cart);