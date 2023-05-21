import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import Controls from "../controls";
function Modal({ children, onClose, title }) {
  const cn = bem("Modal");
  return (
    <div className={cn()}>
      <div className={cn("window")}>
        <div className={cn("row")}>
          <p className={cn("header")}>{title}</p>
          <Controls actionFunc={onClose} title="Закрыть" />
        </div>
        {children}
      </div>

      <div className="overlay"></div>
    </div>
  );
}
Modal.propTypes = {
  children: PropTypes.node,
};
export default React.memo(Modal);
