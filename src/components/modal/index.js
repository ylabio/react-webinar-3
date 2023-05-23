import React from 'react';
import PropTypes from "prop-types";
import './style.css';

const Modal = ({active, setActive, children}) => {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => {setActive(false)}}>
        <div className='modal__content' onClick={e => e.stopPropagation()}>
          {children}
        </div>
    </div>
  )
}


Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children:  PropTypes.node
};
export default Modal;