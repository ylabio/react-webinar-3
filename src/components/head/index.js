import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Head({ title, children, bgNone }) {
  return (
    <div className="Head" style={bgNone && { backgroundColor: "transparent" }}>
      <div className="Head-place">
        <h1>{title}</h1>
      </div>
      <div className="Head-place">{children}</div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  bgNone: PropTypes.bool,
};

export default memo(Head);
