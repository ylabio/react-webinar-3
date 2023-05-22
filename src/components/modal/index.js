import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React from "react";
import "./style.css";

function Modal({ onClose, children, title }) {
  const cn = bem("Modal");

  return (
    <div className={cn()}>
      <div className={cn("body")}>
        <div className={cn("top")}>
          <p className={cn("header")}>{title}</p>

          <button onClick={() => onClose()}>Закрыть</button>
        </div>

        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Modal.defaultProps = {
  onClose: () => {},
};

export default React.memo(Modal);
