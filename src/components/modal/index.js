import React from "react";
import PropTypes, { bool, string } from "prop-types";
import Item from "../item";
import "./style.css";

function Modal({ isShow, title, onClose, children }) {
  return (
    isShow && (
      <div className="ModalLayout">
        <div className="Modal">
          <div className="Modal-head">
            <h2>{title}</h2>
            <button onClick={() => onClose()}>Закрыть</button>
          </div>
          <div className="Modal-body">{children}</div>
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  isShow: bool,
  title: string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  isShow: false,
  title: "",
  onClose: () => {},
};

export default React.memo(Modal);
