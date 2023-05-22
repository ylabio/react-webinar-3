import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import Footer from '../footer';
import ItemCart from '../item-cart';
import './style.css';

function Modal({ list, modalActive, toggleCartOpen, onRemove, summary }) {

	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			toggleCartOpen();
		}
	}
	const cn = bem('Modal');
	return (
		<div className={!modalActive ? cn() : cn() + ' ' + cn('active')} onClick={callbacks.toggleCartOpen}>
			<div className={cn('content')} onClick={(e) => e.stopPropagation()}>
				<Head title='Корзина' modalActive={modalActive} toggleCartOpen={toggleCartOpen} />
				<List >
					{list.map(item =>
						<ItemCart key={item.code} item={item} onRemove={onRemove} />
					)}
				</List>
				<Footer summary={summary} />
			</div>
		</div>
	)
};

Modal.propTypes = {
	list: PropTypes.arrayOf(PropTypes.shape({
		code: PropTypes.number,
		title: PropTypes.string,
		price: PropTypes.number
	})),
	modalActive: PropTypes.bool,
	toggleCartOpen: PropTypes.func,
	onRemove: PropTypes.func,
};



Modal.defaultProps = {
	toggleCartOpen: () => { },
	onRemove: () => { },
}

export default React.memo(Modal);
