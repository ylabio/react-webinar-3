import React from "react";
import PropTypes from 'prop-types';
import plural from "plural-ru";
import './style.css';

function Controls({totalCount, totalPrice, openCart}) {
		
	return (
		<div className='Controls'>
			<span className='Controls-text'>В корзине:</span>
			<span className='Controls-total'>
                {(totalCount > 0) ? totalCount + ' ' +
	                plural(totalCount, 'товар', 'товара', 'товаров') + ' / ' +
                    (totalPrice.toLocaleString('ru-RU'))  + ' ₽' +
                    '  ' : 'пусто'}
            </span>
			<button className='Controls-button'
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
