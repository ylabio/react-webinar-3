import React from "react";
import './style.css';
import PropTypes from "prop-types";
import Head from "../head";

function Modal({ setModal, modalTitle, children }) {

  return (
    <div className='Modal'>
      <div className='Modal-container'>
        <Head title={modalTitle}>
          <button className='Modal-close' onClick={() => setModal(false)}>Закрыть</button>
        </Head>
        <div className="Modal-list">
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  setModal: PropTypes.func,
};

Modal.defaultProps = {
  setModal: () => { },
}


export default React.memo(Modal);