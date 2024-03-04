import React from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {plural} from '../../utils';
import './style.css';

function Controls({cartProducts, cartSum, onShowCart}) {
	const cn = bem('Controls');
	return (
		<div className={cn()}>
			<span className={cn('info')}>
				В корзине:{' '}
				<b>
					{cartProducts.length
						? cartProducts.length +
						  ` ${plural(cartProducts.length, {
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
	cartProducts: PropTypes.array,
	cartSum: PropTypes.number,
};

Controls.defaultProps = {
	onAdd: () => {},
	cartProducts: [],
	cartSum: 0,
};

export default React.memo(Controls);
