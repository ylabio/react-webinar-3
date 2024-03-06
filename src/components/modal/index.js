import React from "react";
import PropTypes from 'prop-types';
import "./style.css";

function Modal({onClose, children}) {
	return (
		<div className="Modal" onClick={(event) => {
			if (event.target === event.currentTarget) {
				onClose();
			}
		}}>
			<div className="Modal-content">
				<div className="Modal-head">
					<h2 className="Modal-title">Корзина</h2>
					<button onClick={() => onClose()}>Закрыть</button>
				</div>
				<div className="Modal-body">
					{children}
				</div>
			</div>
		</div>
	);
}

Modal.propTypes = {
  onClose: PropTypes.func,
	children: PropTypes.node
};

Modal.defaultProps = {
  onClose: () => {},
}

export default React.memo(Modal);