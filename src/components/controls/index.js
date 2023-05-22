import React from "react";
import PropTypes from 'prop-types';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls({totalCount, totalPrice, openCart}) {
	
	const cn = bem('Controls');
	
	return (
		<div className={cn()}>
			<span className={cn('text')}>В корзине:</span>
			<span className={cn('total')}>
                {(totalCount > 0) ? totalCount + ' ' +
	                plural(totalCount, 'товар', 'товара', 'товаров') + ' / ' +
	                Intl.NumberFormat('ru-RU').format(totalPrice) + ' ₽' +
	                '  ' : 'пусто'}
            </span>
			<button className={cn('button')}
			        onClick={openCart}>
				Перейти
			</button>
		</div>
	)
}

Controls.propTypes = {
	totalCount: PropTypes.number.isRequired,
	totalPrice: PropTypes.number.isRequired,
	openCart: PropTypes.func.isRequired,
};

Controls.defaultProps = {
	totalCount: 0,
	totalPrice: 0,
}

export default React.memo(Controls);
