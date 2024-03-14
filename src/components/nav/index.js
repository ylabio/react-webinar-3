import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './style.css';

const Nav = ({ textLink }) => {
  return (
    <Link className="Nav" to="/">
      {textLink}
    </Link>
  );
};

Nav.propTypes = {
  textLink: PropTypes.string,
};

export default memo(Nav);
