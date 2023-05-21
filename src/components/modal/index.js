import React from 'react';
import PropTypes from "prop-types";
import './style.css';

function Modal({children, title, setModalShow}){

	return (
		<div className="overlay">
			<div className="modal">
				<div className="modal-header">
					<h2>{title}</h2>

					<button onClick={() => setModalShow(false)}>закрыть</button>
				</div>

				{children}
			</div>
		</div>
	)
}

Modal.propTypes = {
  title: PropTypes.string,
  setModalShow: PropTypes.func,
};

Modal.defaultProps = {
	title: "",
  setModalShow: () => {},
}

export default React.memo(Modal);