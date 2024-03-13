import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function NavWrapper({children}) {
  return <div className="NavWrapper">
    {children}
  </div>
}

NavWrapper.propTypes = {
  children: PropTypes.node
};

export default React.memo(NavWrapper);