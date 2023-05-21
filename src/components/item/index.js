import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAdd, onRemove }) {

	const callbacks = {
		onAdd: (e) => {
			e.stopPropagation();
			onAdd(item);
		},
		onRemove: (e) => {
			e.stopPropagation();
			onRemove(item.code);
		}
	}

	return (
		<div className={'Item'}>
			<div className='Item-code'>{item.code}</div>
			<div className='Item-title'>
				{item.title}
			</div>
			<div className='Item-actions'>
				{item.quant ?
					<>
						<span className='Item-value'>{item.price}&nbsp;&#8381;</span>
						<span className='Item-quant'>{item.quant}&nbsp;шт</span>
					</> :
					<span className='Item-value-small'>{item.price}&nbsp;&#8381;</span>
				}

				{item.quant ?
					<button onClick={callbacks.onRemove}>&nbsp;&nbsp;Удалить&nbsp;</button> :
					<button onClick={callbacks.onAdd}>Добавить</button>
				}
			</div>
		</div>
	);
}

Item.propTypes = {
	item: PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number,
		quant: PropTypes.number,
	}).isRequired,
	onRemove: PropTypes.func,
	onAdd: PropTypes.func
};

Item.defaultProps = {
	onRemove: () => { },
	onAdd: () => { },
}

export default React.memo(Item);
