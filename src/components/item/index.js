import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAdd }) {

	const callbacks = {
		onAdd: (e) => {
			e.stopPropagation();
			onAdd(item.code);
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
					<span className='Item-value-small'>{item.price}&nbsp;&#8381;</span>
					<button onClick={callbacks.onAdd}>Добавить</button>
				</div>
			</div>
		</li>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
	}).isRequired,
	onAdd: PropTypes.func
};

Item.defaultProps = {
	onAdd: () => { },
}

export default React.memo(Item);
