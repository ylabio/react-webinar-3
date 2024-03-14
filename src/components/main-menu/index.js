import { memo } from "react";
import './style.css';
import PropTypes from "prop-types";

function MainMenu({ children }) {
  return <div className="Main-menu">
    {children}
  </div>
}

MainMenu.propTypes = {
  children: PropTypes.node,
};


export default memo(MainMenu); 