import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Modal({ onModalClose, children }) {
  const cn = bem("Modal");

  return (
    <div id="Modal" className={cn()} onClick={onModalClose}>
      <div className={cn("content")}>{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onModalClose: PropTypes.func,
};

Modal.defaultProps = {
  onModalClose: () => {},
};

export default React.memo(Modal);
