import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { plural } from '../../utils.js';
import './style.css';

const Item = ({ item, onDelete, onSelect }) => {
	console.log(`Item ${item.code}`);

	const [count, setCount] = useState(0);

	const callbacks = {
		onClick: () => {
			onSelect(item.code);
			if (!item.selected) {
				setCount(count + 1);
			}
		},
		onDelete: (e) => {
			e.stopPropagation();
			onDelete(item.code);
		},
	};

	return (
		<div key={item.code} className="List-item">
			<div className={'Item' + (item.selected ? ' Item_selected' : '')} onClick={callbacks.onClick}>
				<div className="Item-code">{item.code}</div>
				<div className="Item-title">
					{item.title}{' '}
					{item.count &&
						` | Выделяли ${item.count} ${plural(count, {
							one: 'раз',
							few: 'раза',
							many: 'раз',
						})}`}
				</div>
				<div className="Item-actions">
					<button onClick={callbacks.onDelete}>Удалить</button>
				</div>
			</div>
		</div>
	);
};

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		selected: PropTypes.bool,
	}),
	onDelete: PropTypes.func,
	onSelect: PropTypes.func,
};

Item.defaultProps = {
	onDelete: () => {},
	onSelect: () => {},
};

export default React.memo(Item);
