import React from 'react';
import './style.css';
import Head from "../head";
import PropTypes from "prop-types";

function Modal({onCloseModal, children}) {
  return (
    <div className='Modal'>
      <div className='Modal-wrapper'>
        <Head title='Корзина' isModal onClose={onCloseModal} />
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onCloseModal: PropTypes.func,
};

Modal.defaultProps = {
  onCloseModal: () => {
  }
}

export default React.memo(Modal);