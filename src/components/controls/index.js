import React from "react";
import PropTypes from "prop-types";
import Modal from "../modal/index";
import "./style.css";

function Controls({ onAdd, modal, openModal }) {
  return (
    <>
      <div
        className="Controls"
        onClick={() => {
          openModal;
        }}
      >
        <button onClick={() => onAdd()}>Добавить</button>
      </div>

      {modal ? <Modal /> : null}
    </>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
