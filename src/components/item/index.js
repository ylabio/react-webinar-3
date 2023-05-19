import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onAddCartItem}) {
	
	const cn = bem('Item');
	
	const callbacks = {
		example: useCallback(() => {
			console.log(item.code);
		}, [item]),
		onAdd: useCallback(() => {
			onAddCartItem(item.code);
		}, [onAddCartItem, item]),
	}
	
	return (
		<div className={cn()}>
			<div className={cn('code')}>{item.code}</div>
			<div className={cn('title')}>
				{item.title}
			</div>
			<div className={cn('price')}>
				{Intl.NumberFormat('ru-RU').format(item.price)} ₽
			</div>
			<div className={cn('actions')}>
				<button className={cn('button')} onClick={callbacks.onAdd}>
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
