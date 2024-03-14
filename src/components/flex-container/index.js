import React from "react";
import "./style.css";
import PropTypes from "prop-types";
function FlexContainer({ children, flex, justify, align, p, direction, gap }) {
  return (
    <div
      style={{
        display: flex ? "flex" : "block",
        justifyContent: justify,
        alignItems: align,
        padding: p,
        flexDirection: direction,
        gap: gap,
      }}
    >
      {children}
    </div>
  );
}

FlexContainer.propTypes = {
  children: PropTypes.node.isRequired,
  flex: PropTypes.bool,
  justify: PropTypes.oneOf([
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
  alignItems: PropTypes.oneOf([
    "stretch",
    "flex-start",
    "flex-end",
    "center",
    "baseline",
  ]),
  direction: PropTypes.oneOf([
    "row",
    "column",
    "row-reverse",
    "column-reverser",
  ]),
  gap: PropTypes.string,
  p: PropTypes.string,
};

FlexContainer.defaultProps = {
  flex: true,
  justify: "center",
  align: "center",
  direction: "row",
  gap: "0",
  p: "0",
};
export default FlexContainer;
