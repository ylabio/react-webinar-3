import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";
import {createPortal} from "react-dom";

const modalRoot = document.querySelector("#modal-root");

function Modal({children, closeModal}) {

  const cn = bem("Modal");

  React.useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return createPortal(
    <>
      <div className={cn()}>
        <div className={cn("main")}>
          {children}
        </div>
      </div>
    </>, modalRoot,
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default React.memo(Modal);
