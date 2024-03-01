import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAction,title }) {
  return (
    <div className='Controls'>
          <button onClick={() => onAction()}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
    onAction: PropTypes.func
};

Controls.defaultProps = {
    onAction: () => {}
}

export default React.memo(Controls);
