import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({modal = false, children}) {
  return (
    <div className={`Modal ${modal ? 'Modal-open' : 'Modal-close'}`}>
      <div className={
        (`Modal-content ${
          modal ? 'Modal-content-open' : 'Modal-content-close'
        }`)
      }>
        {children ? children : null}
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Modal.propTypes = {
  modal: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

// Default values for properties:
Modal.defaultProps = {
  modal: false,
};

export default React.memo(Modal);
