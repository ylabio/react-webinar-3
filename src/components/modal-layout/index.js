import React from "react";
import PropTypes from 'prop-types';
import HeadModal from "../headModal";
import './style.css';

function ModalLayout({title, active, closeModal, children}) {

  return (
    <div className={`Modal ${active ? 'active' : ''}`} onClick={(e) => closeModal(false)}>
      <div className="Modal-window" onClick={(event) => event.stopPropagation()}>
        <HeadModal title={title} closeModal={closeModal}/>
        {children}
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  active: PropTypes.bool,
  closeBasket: PropTypes.func
};

export default React.memo(ModalLayout);