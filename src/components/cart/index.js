import React from "react";
import PropTypes from 'prop-types';
import "./style.css";
import CartItem from "./cart-item";
import { formatPrice } from "../../utils";

function Cart({ list, onClose, onDeleteCartItem, totalCartPrice }) {
	const totalCartPriceContent = `${formatPrice(totalCartPrice)} ₽`;

	const bodyContent = list.length === 0 ? <h3 className="Cart-warning">Корзинка пуста!</h3> :
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
	;

	return (
		<div className="Cart" onClick={(event) => {
			if (event.target === event.currentTarget) {
				onClose();
			}
		}}>
			<div className="Cart-content">
				<div className="Cart-head">
					<h2 className="Cart-title">Корзина</h2>
					<button onClick={() => onClose()}>Закрыть</button>
				</div>
				<div className="Cart-body">
					{bodyContent}
				</div>
			</div>
		</div>
	);
}

Cart.propTypes = {
  onClose: PropTypes.func,
  onDeleteCartItem: PropTypes.func,
	list: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
		price: PropTypes.number
  })),
	totalCartPrice: PropTypes.number
};

Cart.defaultProps = {
  onClose: () => {},
  onDeleteCartItem: () => {},
	totalCartPrice: 0
}

export default React.memo(Cart);