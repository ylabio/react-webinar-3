import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({children, title}) {
  return (
    <div className='Head'>
      <h1>{title}</h1>
      {children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
