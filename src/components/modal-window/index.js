import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ModalWindow({ children, isCartOpen }) {
  const cn = bem("modal-window");

  return (
    <div className={`${cn()} overlay ${isCartOpen ? "overlayVisible" : ""}`}>
      <div className={cn("drawer")}>{children}</div>
    </div>
  );
}

ModalWindow.propTypes = {
  children: PropTypes.node,
  isCartOpen: PropTypes.bool,
};

ModalWindow.defaultProps = {
  isCartOpen: false,
};

export default React.memo(ModalWindow);
