import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import CloseIcon from '../../accets/close.svg';

function ModalHead({ title, setVisible }) {
  return (
    <div className="ModalHead">
      <h1>{title}</h1>
      <button onClick={() => setVisible(false)}>
          <img src={CloseIcon} alt="Close" />
      </button>
    </div>
  );
}

ModalHead.propTypes = {
  title: PropTypes.node,
  setVisible: PropTypes.func.isRequired,
};

export default React.memo(ModalHead);
