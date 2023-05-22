import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemCart(props) {

	const callbacks = {
		onRemove: (e) => {
			e.stopPropagation();
			props.onRemove(props.item.code);
		}
	}

	return (
		<li className='List-item'>
			<div className={'Item'}>
				<div className='Item-code'>{props.item.code}</div>
				<div className='Item-title'>
					{props.item.title}
				</div>
				<div className='Item-actions'>
					<span className='Item-value'>{props.item.price.toLocaleString('ru-RU')}&nbsp;&#8381;</span>
					<span className='Item-quant'>{props.item.quant}&nbsp;шт</span>
					<button onClick={callbacks.onRemove}>&nbsp;&nbsp;Удалить&nbsp;</button>
				</div>
			</div>
		</li>
	);
}

ItemCart.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
		quant: PropTypes.number,
	}).isRequired,
	onRemove: PropTypes.func,
};

ItemCart.defaultProps = {
	onRemove: () => { },
}

export default React.memo(ItemCart);
