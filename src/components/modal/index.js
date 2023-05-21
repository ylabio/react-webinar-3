import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Head from '../head';
import List from '../list';
import Footer from '../footer';
import './style.css';

function Modal({ list, modalActive, cartClose, onRemove }) {
	const cn = bem('Modal');
	return (
		<div className={!modalActive ? cn() : cn() + ' ' + cn('active')} onClick={() => cartClose(!modalActive)}>
			<div className={cn('content')} onClick={(e) => e.stopPropagation()}>
				<Head title='Корзина' modalActive={modalActive} cartClose={cartClose} />
				<List list={list} onRemove={onRemove} />
				<Footer />
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
	cartClose: PropTypes.func,
	onRemove: PropTypes.func,
};



Modal.defaultProps = {
	onClose: () => { },
	onRemove: () => { },
}

export default React.memo(Modal);
