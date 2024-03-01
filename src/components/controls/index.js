import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({ onAction, title, children }) {
  return (
    <div className='Controls'>
          {children} <button className="button" onClick={() => onAction()}>{title}</button>
    </div>
  )
}

Controls.propTypes = {
    onAction: PropTypes.func,
    children: PropTypes.node
};

Controls.defaultProps = {
    onAction: () => {}
}

export default React.memo(Controls);
