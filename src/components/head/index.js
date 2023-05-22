import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head({ title, modalActive, toggleCartOpen }) {

	const cn = bem('Head');
	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			toggleCartOpen();
		},
	}
	return (
		<div className={!modalActive ? cn() : cn('modal')}>
			{modalActive ?
				<><h1>{title}</h1><button className='closeBtn' onClick={callbacks.toggleCartOpen}>&nbsp;Закрыть&nbsp;</button></> :
				<h1>{title}</h1>
			}
		</div>
	)
}

Head.propTypes = {
	title: PropTypes.node,
	modalActive: PropTypes.bool,
	toggleCartOpen: PropTypes.func,
};

Head.defaultProps = {
	toggleCartOpen: () => { },
}
export default React.memo(Head);
