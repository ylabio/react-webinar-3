import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';
import PropTypes from "prop-types";

function MainMenu({ main }) {
  return <div className="Main-menu">
    <Link className="Main-menu-link" to='/' >{main}</Link>
  </div>
}

MainMenu.propTypes = {
  main: PropTypes.string,
};


export default memo(MainMenu); 