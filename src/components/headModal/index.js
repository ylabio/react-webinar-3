import React from "react";
import PropTypes from "prop-types";
import './style.css';

function HeadModal({title, closeModal}) {
  return (
    <div className='HeadModal'>
      <h1>{title}</h1>
      <div className='HeadModal-actions'>
        <button onClick={() => closeModal(false)}>Закрыть</button>
      </div>
    </div>
  )
}

HeadModal.propTypes = {
  title: PropTypes.node,
};

export default React.memo(HeadModal);
