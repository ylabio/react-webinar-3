import React from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function List({ children }) {
  const cn = bem("ListComments");
  return <div className={cn()}>{children}</div>;
}

List.propTypes = {
  children: PropTypes.node,
};

List.defaultProps = {};

export default List;
