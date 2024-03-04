import React from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Controls({cart, cartSum, onShowCart}) {
	const cn = bem('Controls');
	return (
		<div className={cn()}>
			<span className={cn('info')}>
				В корзине:{' '}
				<b>
					{cart.length
						? cart.length +
						  ` ${plural(cart.length, {
								one: 'товар',
								few: 'товара',
								many: 'товаров',
						  })}  / ${cartSum} ₽`
						: 'пусто'}
				</b>
			</span>
      <button onClick={() => onShowCart(true)}>Перейти</button>
		</div>
	);
}

Controls.propTypes = {
	onAdd: PropTypes.func,
	cart: PropTypes.array,
	cartSum: PropTypes.number,
};

Controls.defaultProps = {
	onAdd: () => {},
	cart: [],
	cartSum: 0,
};

export default React.memo(Controls);
