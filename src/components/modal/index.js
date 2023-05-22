import PropTypes from 'prop-types';
import './style.css';
import {memo} from "react";

function Modal({setShowModal, children}){
  return (
    <div className='Modal'>
      <div className='Modal-container'>
        <button
          className='Modal-close'
          onClick={() => setShowModal(false)}
        >
          Закрыть
        </button>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  setShowModal: PropTypes.func,
  children: PropTypes.node
};

export default memo(Modal);