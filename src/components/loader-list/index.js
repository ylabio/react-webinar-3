import React from "react";
import "./style.css";
import PropTypes from "prop-types";
function LoaderList({ count }) {
  const list = [...Array(count)].map((item, index) => {
    return <div key={index} className="Loader-item"></div>;
  });

  return <div className="Loader">{list}</div>;
}

LoaderList.propTypes = {
  count: PropTypes.number,
};
LoaderList.defaultProps = {
  count: 10,
};
export default LoaderList;
