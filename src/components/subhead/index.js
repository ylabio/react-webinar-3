import { memo } from "react";
import PropTypes from "prop-types";
import "style.css";

function Subhead({ children }) {
  return <div className="Subhead">{children}</div>;
}

Subhead.propTypes = {
  children: PropTypes.node,
};

export default memo(Subhead);
