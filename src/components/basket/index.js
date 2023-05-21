import React from "react"
import PropTypes from "prop-types"
import List from "../list"
import ItemBasket from "../item-basket"
import "./style.css"

function Basket({basket, totalPrice, deleteOnBasket}) {

	return (
		basket.length ?
		<>
			<List>
				{basket.map(item => 
					<ItemBasket key={item.code} item={item} onDelete={deleteOnBasket}  />
				)}
			</List>
			<div className="Basket-result">
				<b>Итого</b>
				<b>{Intl.NumberFormat("ru",{style: "currency", currency: "RUB", minimumFractionDigits: 0}).format(totalPrice)}</b>
			</div>
		</>
		: <h3>Корзина пуста</h3>
	)
}

Basket.propTypes = {
  basket: PropTypes.array,
	deleteOnBasket: PropTypes.func,
  totalPrice: PropTypes.number,
};

export default React.memo(Basket)
