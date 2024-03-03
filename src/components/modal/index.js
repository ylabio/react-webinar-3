import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

const Modal = ({ title, onClose, children }) => {
  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const cn = bem("Modal");

  return (
    <div className={cn("overlay")} onClick={onOverlayClick}>
      <div className={cn()}>
        <div className={cn("header")}>
          <h2 className={cn("title")}>{title}</h2>
          <button className={cn("close")} onClick={onClose} type="button">
            Закрыть
          </button>
        </div>
        <div className={cn("content")}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default React.memo(Modal);
