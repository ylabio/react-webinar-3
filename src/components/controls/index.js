import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ action, textButton }) {
  return (
    <div className="Controls">
      <button onClick={action}>{textButton}</button>
    </div>
  );
}

Controls.propTypes = {
  action: PropTypes.func,
  textButton: PropTypes.node
};

Controls.defaultProps = {
  action: () => {}
}

export default React.memo(Controls);
