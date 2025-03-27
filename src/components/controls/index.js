import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onOpen, text }) {
  return (
    <div className="Controls">
      <button onClick={() => onOpen()}>{text}</button>
    </div>
  );
}

Controls.propTypes = {
  onOpen: PropTypes.func,
  text: PropTypes.node,
};

Controls.defaultProps = {
  onOpen: () => { },
};

export default React.memo(Controls);
