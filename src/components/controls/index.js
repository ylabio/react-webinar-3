import React from 'react';
import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import {plural} from '../../utils';

function Controls({onAdd, cartProducts, cartSum}) {
	const cn = bem('Controls');

	console.log(cartProducts);
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
			<button onClick={() => onAdd()}>Перейти</button>
		</div>
	);
}

Controls.propTypes = {
	onAdd: PropTypes.func,
};

Controls.defaultProps = {
	onAdd: () => {},
};

export default React.memo(Controls);
