import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function ItemCart({ item, onRemove }) {

	const callbacks = {
		onRemove: (e) => {
			e.stopPropagation();
			onRemove(item.code);
		}
	}

	return (
		<li className='List-item'>
			<div className={'Item'}>
				<div className='Item-code'>{item.code}</div>
				<div className='Item-title'>
					{item.title}
				</div>
				<div className='Item-actions'>
					<span className='Item-value'>{item.price}&nbsp;&#8381;</span>
					<span className='Item-quant'>{item.quant}&nbsp;шт</span>
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
