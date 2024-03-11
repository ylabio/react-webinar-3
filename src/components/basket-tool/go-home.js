import React, { memo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function GoHome({ title }) {
  return (
    <Link to={"/"} className="home">
      {title}
    </Link>
  );
}
GoHome.propTypes = {
  title: PropTypes.string.isRequired,
};
export default memo(GoHome);
