import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({modalOpened, setModalOpened, children}) {
  if (modalOpened)
    return (
      <>
        <div className='modal-overlay'/>
        <div className='modal-wrapper'>
          <header className='modal-header'>
            <h3 className='modal-title'>Корзина</h3>
            <button className='modal-close' type='button' onClick={() => setModalOpened()}>Закрыть</button>
          </header>
          <div className='modal-content'>
            {children}
          </div>
        </div>
      </>
    )
}

Modal.propTypes = {
  modalOpened: PropTypes.bool.isRequired,
  setModalOpened: PropTypes.func,
  children: PropTypes.node
};

Modal.defaultProps = {
  setModalOpened: () => {
  },
  children: null
}

export default React.memo(Modal);