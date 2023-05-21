import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Controls({ onFunc, title }) {
  return (
    <div className="Controls">
      {/* <button onClick={() => onAdd()}>{title}</button> */}
      {/* {closeModal ? <button onClick={() => closeModal()}>{title}</button> :  <button onClick={() => onAdd()}>{title}</button> } */}
      {title === "Закрыть" ? (
        <button onClick={() => onFunc()} className="Controls_btn_close">
          {title}
        </button>
      ) : (
        <button onClick={() => onFunc()}>{title}</button>
      )}
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
  closeModal: PropTypes.func,
};

Controls.defaultProps = {
  onFunc: () => {},
};

export default React.memo(Controls);
