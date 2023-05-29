import React from "react";
import PropTypes from "prop-types";
import "./style.css";
 

function Loader({children, ...props}) {
  return (
      <div {...props} className='Loader'>
          {children}
      </div>
  );
};

Loader.propTypes = {
  children: PropTypes.node,
}

export default Loader;
