import React from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({list, onAction, shapeSwitch, totalPrice}) {
	
	const cn = bem('List');
	
	return (
		<div className={cn()}>{
			list.map(item =>
				<div key={item.code} className={cn('item')}>
					<Item item={item}
					      onAction={onAction}
					      shapeSwitch={shapeSwitch}
					/>
				</div>
			)}
			{!shapeSwitch ? '' :
				<div className={cn('total')}>
					Итого <span>{Intl.NumberFormat('ru-RU').format(totalPrice) + ' ₽'}</span>
				</div>}
		</div>
	)
}

List.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})).isRequired,
	shapeSwitch: PropTypes.bool,
	totalPrice: PropTypes.number.isRequired,
	onAction: PropTypes.func
};

List.defaultProps = {
	onAction: () => {
	},
}

export default React.memo(List);
