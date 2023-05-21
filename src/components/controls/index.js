import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ actionFunc, title }) {
  return (
    <div className="Controls">
      <button onClick={() => actionFunc()}>{title}</button>
    </div>
  );
}

Controls.propTypes = {
  actionFunc: PropTypes.func,
  title: PropTypes.string,
};

Controls.defaultProps = {
  actionFunc: () => {},
};

export default React.memo(Controls);
