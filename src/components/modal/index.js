import React from "react";
import PropTypes, { bool } from "prop-types";
import './style.css';
import useModalClose from "../../hooks/useModalClose";

function Modal({ modalIsOpened, toggleModal, children }) {

  useModalClose(modalIsOpened, toggleModal, 'Modal_opened');

  const callbacks = {
    onCloseButton: () => {
      toggleModal()
    }
  }

  return (
    <div className={`Modal ${modalIsOpened ? 'Modal_opened' : ''}`}>
      <div className="Modal__container">
        <button className="Modal__close-btn" onClick={callbacks.onCloseButton}>
            Закрыть
        </button>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  modalIsOpened: bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default React.memo(Modal);
