import React, {useCallback} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onAction, shapeSwitch, totalPrice}) {
	
	const cn = bem('Item');
	
	const callbacks = {
		onItemAction: useCallback(() => {
			onAction(item.code);
		}, [onAction, item]),
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
				<button className={cn('button')} onClick={callbacks.onItemAction}>
					{!shapeSwitch ? 'Добавить' : 'Удалить'}
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
	shapeSwitch: PropTypes.bool,
	onItemAction: PropTypes.func
};

Item.defaultProps = {
	onItemAction: () => {
	},
}

export default React.memo(Item);
