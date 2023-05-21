import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, modalActive, cartClose }) {

	const cn = bem('Head');
	const callbacks = {
		cartClose: (e) => {
			e.stopPropagation();
			cartClose(!modalActive);
		},
	}
	return (
		<div className={!modalActive ? cn() : cn('modal')}>
			{modalActive ?
				<><h1>{title}</h1><button className='closeBtn' onClick={callbacks.cartClose}>&nbsp;Закрыть&nbsp;</button></> :
				<h1>{title}</h1>
			}
		</div>
	)
}

Head.propTypes = {
	title: PropTypes.node,
	modalActive: PropTypes.bool,
	cartClose: PropTypes.func,
};

export default React.memo(Head);
