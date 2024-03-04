import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({children, title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      <div className="Head-controls">
        {children}
      </div>
    </div>
  )
}

Head.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

Head.defaultProps = {
  title: ''
};

export default React.memo(Head);
