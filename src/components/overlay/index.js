import React from "react";
import './style.css';
import PropTypes from "prop-types";

function Overlay({children}) {

  return (
    <div className='Overlay'>
      {children}
    </div>  
  )
}

Overlay.propTypes = {
  children: PropTypes.node,
};

export default Overlay;
