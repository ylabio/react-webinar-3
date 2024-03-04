import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Popup(props) {
  return (
    <div
      className={`Popup ${props.isOpen ? 'Popup_active' : ''}`}
      onClick={props.onCloseModal}>
      <div
        className={`Popup__content ${props.isOpen ? 'Popup__content_active' : ''}`}
        onClick={(e) => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

Popup.defaultProps = {
  onCloseModal: () => { },
  funcButton: () => { }
}

export default React.memo(Popup);
