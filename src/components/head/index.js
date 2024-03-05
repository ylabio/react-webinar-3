import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Head({ title, children }) {
  return (
    <div className='Head'>
      <div className='headerContainer'>
        <h1>{title}</h1>
        <div className='Button'>{children}</div>
      </div>
    </div>
  );
}


Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
