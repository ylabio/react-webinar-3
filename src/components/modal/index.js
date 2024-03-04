import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({state = false}) {
  return (
    <div className={`Modal ${state ? 'Modal-open' : 'Modal-close'}`}>
      <div className='Modal-control'></div>
      <div className='Modal-content'></div>
    </div>
  )
}

// Typechecking with PropTypes:
Modal.propTypes = {
  title: PropTypes.bool.isRequired,
};

// Default values for properties:
Modal.defaultProps = {
  title: false,
};

export default React.memo(Modal);
