import React from "react";
import PropTypes from 'prop-types';
import List from '../list';
import { cn as bem } from '@bem-react/classname';
import './style.css'

function Cart({ cart, btn }) {
	const cn = bem('Cart');
	return (
		<>
			{cart.length !== 0 ? <>
				<div className={cn()}>
					<List list={cart} btn={btn} />
				</div>
				<div className={cn('footer')}>
					<div>Итого:</div>
					<div>{cart.reduce((acc, item) => acc + item.price * item.count, 0).toLocaleString()}&nbsp;₽</div>
				</div>
			</>
				: <div className={cn('empty')}>В корзине пусто</div>
			}
		</>
	)
}

Cart.propTypes = {
	cart: PropTypes.array,
	btn: PropTypes.object
};

export default React.memo(Cart);
