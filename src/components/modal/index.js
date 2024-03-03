import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import ModalOverlay from '../modal-overlay';
import './style.css';

function Modal(props) {
  
  const cn = bem('Modal');
  
  return (props.show ? 
    <div className={cn()}>
      <ModalOverlay onClick={props.onClose} />
      <div onClick={(e) => e.stopPropagation()} className={cn('container')}>
        <div className={cn('heading')}>
          <h1 className={cn('title')}>{props.title}</h1>
          <button 
            type="button" 
            className={cn('close-button')} 
            onClick={props.onClose}
          >
            {props.buttonText}
          </button>
        </div>

      {props.children}

      </div>

    </div>
  : <></>)
}

Modal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.node,
  buttonText: PropTypes.node,
  onClose: PropTypes.func,
};

Modal.defaultProps = {
  show: false,
  title: "Title",
  buttonText: "button",
  onClose: () => {}
}

export default React.memo(Modal);
