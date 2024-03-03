import PropTypes from 'prop-types';
import React from 'react';
import Item from '../item/index.js';
import './style.css';

const List = ({ list, onDeleteItem, onSelectItem }) => {
	console.log('List');

	return (
		<div className="List">
			{list.map((item) => (
				<div key={item.code} className="List-item">
					<Item item={item} onDelete={onDeleteItem} onSelect={onSelectItem} />
				</div>
			))}
		</div>
	);
};

List.propTypes = {
	list: PropTypes.arrayOf(
		PropTypes.shape({
			code: PropTypes.number,
		}),
	).isRequired,
	onDeleteItem: PropTypes.func,
	onSelectItem: PropTypes.func,
};

List.defaultProps = {
	onDeleteItem: () => {},
	onSelectItem: () => {},
};

export default React.memo(List);
