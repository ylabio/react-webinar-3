import { memo } from "react";
import PropTypes from "prop-types";
import "style.css";

function Row({ type, children }) {
  return (
    <div className="Row">
      <div className={`Row-${type}`}>{children}</div>
    </div>
  );
}

Row.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default memo(Row);
