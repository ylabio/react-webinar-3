import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({state = false, children}) {
  return (
    <div className={`Modal ${state ? 'Modal-open' : 'Modal-close'}`}>
      <div className={
        (`Modal-content ${
          state ? 'Modal-content-open' : 'Modal-content-close'
        }`)
      }>
        {children ? children : null}
      </div>
    </div>
  )
}

// Typechecking with PropTypes:
Modal.propTypes = {
  title: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

// Default values for properties:
Modal.defaultProps = {
  title: false,
};

export default React.memo(Modal);
