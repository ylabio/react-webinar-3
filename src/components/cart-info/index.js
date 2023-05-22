import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';

function CartInfo({ toggleCartOpen, summary, quantityItems }) {

	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			toggleCartOpen();
		},
	}

	return (
		<div className='CartInfo'>
			<p className='CartContains'>В корзине:
				<b> &nbsp;{quantityItems ? `${quantityItems} ${plural(quantityItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${summary} ₽` : 'пусто'}&nbsp;&nbsp;</b>
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
