import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import ModalOverlay from '../modal-overlay';
import './style.css';

function Modal({show, title, buttonText, onClose, children}) {
  
  const cn = bem('Modal');
  
  return (show ? 
    <div className={cn()}>
      <ModalOverlay onClick={onClose} />
      <div onClick={(e) => e.stopPropagation()} className={cn('container')}>
        <div className={cn('heading')}>
          <h1 className={cn('title')}>{title}</h1>
          <button 
            type="button" 
            className={cn('close-button')} 
            onClick={onClose}
          >
            {buttonText}
          </button>
        </div>

      {children}

      </div>

    </div>
  : <></>)
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.node,
  buttonText: PropTypes.node,
  // onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  show: false,
  title: "Title",
  buttonText: "button",
  // onClose: () => {}
}

export default React.memo(Modal);
