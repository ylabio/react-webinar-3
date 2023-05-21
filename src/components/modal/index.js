import React from "react";
import PropTypes from "prop-types";
import Head from "../head";
import Item from "../item";
import { countAllPrices, formatNumbers } from "../../utils";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ openStatus, head, children }) {
  const cn = bem("Modal");

  if (!openStatus) return null;

  return (
    <div className="wrapper">
      <div className={cn()}>
        <div className={cn("head")}>{head}</div>
        <div className={cn("body")}>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  head: PropTypes.element,
  openStatus: PropTypes.bool,
};

Modal.defaultProps = {
  children: null,
  head: null,
  openStatus: false,
};

export default React.memo(Modal);
