import React from "react";
import PropTypes from 'prop-types';
import List from '../list';
import { cn as bem } from '@bem-react/classname';
import cartItem from "../cartItem";
import './style.css'

function Cart({ cart, cartSum, btn }) {
	const cn = bem('Cart');
	return (
		<>
			{cart.length !== 0 ? <>
				<div className={cn()}>
					<List list={cart} Item={cartItem} btn={btn} />
				</div>
				<div className={cn('footer')}>
					<div>Итого:</div>
					<div>{cartSum.toLocaleString()}&nbsp;₽</div>
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
