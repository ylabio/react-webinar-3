import React from "react";
// import PropTypes from 'prop-types';
import './style.css';
import { plural } from "../../utils";

function CartInfo({ cart }) {
	return (
		<div className='CartInfo'>
			<p className='CartContains'>В корзине:
				<b> &nbsp;{cart.allItems ? `${cart.allItems} ${plural(cart.allItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${cart.sum} ₽` : 'пусто'}&nbsp;&nbsp;</b>
			</p>
			<button onClick={() => goToCart()}>&nbsp;Перейти&nbsp;</button>
		</div>
	)
}

// CartInfo.propTypes = {
// 	onAdd: PropTypes.func
// };

// CartInfo.defaultProps = {
// 	onAdd: () => { }
// }

export default React.memo(CartInfo);
