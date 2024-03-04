import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({state = 0}) {
  return (
    <div className={`Modal ${state === 0 ? 'Modal-close' : 'Modal-open'}`}>
      <div className='Modal-control'></div>
      <div className='Modal-content'></div>
    </div>
  )
}

// Typechecking with PropTypes:
Modal.propTypes = {
  title: PropTypes.number.isRequired,
};

// Default values for properties:
Modal.defaultProps = {
  title: 0,
};

export default React.memo(Modal);
