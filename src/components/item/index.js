import React, { useState } from "react";
import PropTypes from "prop-types";

import './style.css';

function Item(props) {

	const callbacks = {
		onAdd: (e) => {
			e.stopPropagation();
			props.onAdd(props.item);
		},
		onRemove: (e) => {
			e.stopPropagation();
			props.onRemove(props.item.code);
		}
	}

	return (
		<div className={'Item' + (props.item.selected ? ' Item_selected' : '')}>
			<div className='Item-code'>{props.item.code}</div>
			<div className='Item-title'>
				{props.item.title}
			</div>
			<div className='Item-actions'>
				<span className='Item-value'>{props.item.price}&nbsp;&#8381;</span>
				<button onClick={callbacks.onAdd}>
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
		selected: PropTypes.bool,
		count: PropTypes.number
	}).isRequired,
	onDelete: PropTypes.func,
	onSelect: PropTypes.func
};

Item.defaultProps = {
	onDelete: () => { },
	onSelect: () => { },
}

export default React.memo(Item);
