import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function CartInfo(props) {

	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			props.toggleCartOpen();
		},
	}

	return (
		<div className='CartInfo'>
			<p className='CartContains'>В корзине:
				<b> &nbsp;{props.quantityItems ? `${props.quantityItems} ${plural(props.quantityItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${props.summary} ₽` : 'пусто'}&nbsp;&nbsp;</b>
			</p>
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
