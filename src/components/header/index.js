import React from "react";
import PropTypes from "prop-types";
import './style.css';

function Header({ children }) {
  return (
    <div className='Header'>
      {children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Header);
