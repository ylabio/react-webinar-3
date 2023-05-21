import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { plural } from '../../utils';
import { Context } from './../../context';

function CartInfo({ cartOpen }) {

	const callbacks = {
		cartOpen: (e) => {
			e.stopPropagation();
			cartOpen();
		},
	}

	const { summary, quantityItems } = useContext(Context);
	return (
		<div className='CartInfo'>
			<p className='CartContains'>В корзине:
				<b> &nbsp;{quantityItems ? `${quantityItems} ${plural(quantityItems, { one: 'товар', few: 'товара', many: 'товаров' })} / ${summary} ₽` : 'пусто'}&nbsp;&nbsp;</b>
			</p>
			<button onClick={callbacks.cartOpen}>&nbsp;&nbsp;Перейти&nbsp;</button>
		</div>
	)
}

CartInfo.propTypes = {
	cartOpen: PropTypes.func
};

CartInfo.defaultProps = {
	cartOpen: () => { }
}

export default React.memo(CartInfo);
