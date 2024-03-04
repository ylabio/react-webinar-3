import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Modal({state = false, children, forClose}) {
  return (
    <div className={`Modal ${state ? 'Modal-open' : 'Modal-close'}`}>
      <div className='Modal-control' onClick={(event) => {
        forClose();
        event.stopPropagation();
        }
      }>
        ❌
      </div>
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
  forClose: PropTypes.func.isRequired,
};

// Default values for properties:
Modal.defaultProps = {
  title: false,
  forClose: () => {},
};

export default React.memo(Modal);
