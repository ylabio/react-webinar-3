import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List({ list, onAdd, onRemove }) {

	return (
		<ul className='List list-reset'>
			{list.map(item =>
				<li key={item.code} className='List-item'>
					<Item item={item} onAdd={onAdd} onRemove={onRemove} />
				</li>
			)}
		</ul>
	)
}

List.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number
	})).isRequired,
	onAdd: PropTypes.func,
	onRemove: PropTypes.func
};

List.defaultProps = {
	onAdd: () => { },
	onRemove: () => { },
}

export default React.memo(List);
