import { memo } from "react";
import { Link } from "react-router-dom";
import './style.css';
import PropTypes from "prop-types";

function Menu({ main, setCurrentPage }) {
  return <div className="Menu">
    <Link onClick={() => setCurrentPage(0)} className="Menu-link" to='/' >{main}</Link>
  </div>
}

Menu.propTypes = {
  main: PropTypes.string,
  setCurrentPage: PropTypes.func
};

Menu.defaultProps = {
  setCurrentPage: (page) => { },
}

export default memo(Menu); 