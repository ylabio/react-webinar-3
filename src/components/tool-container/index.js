import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function ToolContainer({children}) {
  return <div className="ToolContainer">
    {children}
  </div>
}

ToolContainer.propTypes = {
  children: PropTypes.node
};

export default React.memo(ToolContainer);