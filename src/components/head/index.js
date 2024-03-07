import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({children, title}) {
  return (
    <div className='Head'>
      <h1 className="Head-title">{title}</h1>
      {children}
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default React.memo(Head);
