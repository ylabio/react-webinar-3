import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function CartInfo(props) {
	const summeryLoc = props.summary.toLocaleString('ru-RU');

	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			props.toggleCartOpen();
		},
	}

	return (

		<div className='CartInfo'>
			<p className='CartContains'>В корзине:</p>
			<b className='CartQuantity'> &nbsp;{props.quantityItems ? `${props.quantityItems} ${plural(props.quantityItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${summeryLoc} ₽` : 'пусто'}&nbsp;&nbsp;</b>
			<button onClick={callbacks.toggleCartOpen}>&nbsp;&nbsp;Перейти&nbsp;</button>
		</div>
	)
}

CartInfo.propTypes = {
	toggleCartOpen: PropTypes.func
};

CartInfo.defaultProps = {
	toggleCartOpen: () => { }
}

export default React.memo(CartInfo);
