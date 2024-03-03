import React from "react";
import PropTypes, { bool } from "prop-types";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ children, isOpenModal }) {

	const cn = bem('Modal');

	return (
		<div className={isOpenModal ? cn('wrapper') : cn('wrapper-closed')}>
			<div className={cn()}>
				{children}
			</div>
		</div>
	);
}

Modal.propTypes = {
	isOpenModal: PropTypes.bool,
	children: PropTypes.node
}

export default React.memo(Modal);
