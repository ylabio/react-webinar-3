import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {

	const callbacks = {
		onAdd: (e) => {
			e.stopPropagation();
			props.onAdd(props.item.code);
		}
	}

	return (
		<li className='List-item'>
			<div className={'Item'}>
				<div className='Item-code'>{props.item.code}</div>
				<div className='Item-title'>
					{props.item.title}
				</div>
				<div className='Item-actions'>
					<span className='Item-value-small'>{props.item.price}&nbsp;&#8381;</span>
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
