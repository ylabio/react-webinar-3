import {memo} from "react";
import PropTypes from "prop-types";
import './style.css';

function NavBar ({children}) {
  return (
    <div className='nav-bar'>
      {children}
    </div>
  );
};

NavBar.propTypes = {
  children: PropTypes.node
}

export default memo(NavBar);