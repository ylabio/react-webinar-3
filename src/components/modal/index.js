import React, { useEffect } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

function Modal(props) {
  const { children, title, closeElement, setIsVisible } = props;
  const cn = bem("Modal");

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);

  return (
    <div className={cn()}>
      <div className={cn("wraper")}>
        <div className={cn("inner")}>
          <div className={cn("header")}>
            <h2 className={cn("header-title")}>{title}</h2>
            <button onClick={() => setIsVisible(false)}>{closeElement}</button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  closeElement: PropTypes.node.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};

export default Modal;
