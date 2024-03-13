import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';
import PropTypes from "prop-types";

function Menu({ main }) {
  return <div className="Menu">
    <Link className="Menu-link" to='/' >{main}</Link>
  </div>
}

Menu.propTypes = {
  main: PropTypes.string,
};


export default memo(Menu); 