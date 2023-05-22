import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import Footer from '../footer';
import ItemCart from '../item-cart';
import './style.css';

function Modal(props) {

	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			props.toggleCartOpen();
		}
	}
	const cn = bem('Modal');
	return (
		<div className={!props.modalActive ? cn() : cn() + ' ' + cn('active')} onClick={callbacks.toggleCartOpen}>
			<div className={cn('content')} onClick={(e) => e.stopPropagation()}>
				<Head title='Корзина' modalActive={props.modalActive} toggleCartOpen={props.toggleCartOpen} />
				<List >
					{props.list.map(item =>
						<ItemCart key={item.code} item={item} onRemove={props.onRemove} />
					)}
				</List>
				<Footer summary={props.summary} />
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
