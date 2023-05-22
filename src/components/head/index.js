import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Head(props) {

	const cn = bem('Head');
	const callbacks = {
		toggleCartOpen: (e) => {
			e.stopPropagation();
			props.toggleCartOpen();
		},
	}
	return (
		<div className={!props.modalActive ? cn() : cn('modal')}>
			{props.modalActive ?
				<><h1>{props.title}</h1><button className='closeBtn' onClick={callbacks.toggleCartOpen}>&nbsp;Закрыть&nbsp;</button></> :
				<h1>{props.title}</h1>
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
