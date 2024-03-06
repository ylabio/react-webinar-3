import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Modal({setOpen,modalTitle,children}) {
  return (
    <div className='Modal'>
      <div className="Modal__content">
				<div className="Modal__header">
					<h2 className='Modal__title'>{modalTitle}</h2>
					<button onClick={()=>setOpen(false)}>Закрыть</button>
				</div>
				<div className="Modal__body">
				{children}
				</div>
			</div>
    </div>
  )
}

Modal.propTypes = {
	setOpen: PropTypes.func,
	children: PropTypes.node
};

Modal.defaultProps = {
	setOpen: () => {},
}

export default React.memo(Modal);
