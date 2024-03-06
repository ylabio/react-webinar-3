import React from "react";
import PropTypes from 'prop-types';
import './style.css';
import Head from '../head';

function Modal({children, title, handleCloseModal}) {
  return (
    <div className="darkBG">
      <div className="Modal">
        <Head title={title} modal handleCloseModal={handleCloseModal} />
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  handleCloseModal: PropTypes.func,
}

export default React.memo(Modal);