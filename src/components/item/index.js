import React, {useCallback} from "react";
import PropTypes from "prop-types";
import './style.css';

function Item({item, onAddCartItem}) {
	
	const callbacks = {
		example: useCallback(() => {
			console.log(item.code);
		}, [item]),
		onAdd: useCallback(() => {
			onAddCartItem(item.code);
		}, [onAddCartItem, item]),
	}
	
	return (
		<div className='Item'>
			<div className='Item-code'>{item.code}</div>
			<div className='Item-title'>
				{item.title}
			</div>
			<div className='Item-price'>
				{Intl.NumberFormat('ru-RU').format(item.price)} ₽
			</div>
			<div className='Item-actions'>
				<button className='Item-button' onClick={callbacks.onAdd}>
					Добавить
				</button>
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.string,
	}).isRequired,
	onAdd: PropTypes.func
};

Item.defaultProps = {
	onAdd: () => {
	},
}

export default React.memo(Item);
