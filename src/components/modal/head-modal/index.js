import React from "react";
import {cn as bem} from '@bem-react/classname';
import PropTypes from "prop-types";
import './style.css';

function HeadModal({title, handleCloseModal}) {

  return (
    <div className='Head-modal'>
      <h1>{title}</h1>
      <button className='Head-modal-btn-close' onClick={handleCloseModal}>Закрыть</button>
    </div>
  )
}

HeadModal.propTypes = {
  title: PropTypes.node,
  handleCloseModal: PropTypes.func
};

export default React.memo(HeadModal);
