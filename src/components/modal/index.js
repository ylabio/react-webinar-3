import React from 'react';
import './style.css'
import PropTypes from "prop-types";

const Modal = ({ active, setActive, children }) => {
  return (
    <div
      className={active ? 'Modal active' : 'Modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'Modal-content active' : 'Modal-content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  children: PropTypes.node
}

Modal.defaultProps = {
  setActive: () => {}
}

export default React.memo(Modal);
