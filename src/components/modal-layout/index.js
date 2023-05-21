import React from "react";
import PropTypes from "prop-types";
import './style.css';
import Modal from "../modal";

function ModalLayout(props) {
  const onCloseModel = (e) => {
    if (e.currentTarget === e.target) {
      props.setModal(false);
    }
  };

  return (
    <div className={'Modal-background'}
      onClick={onCloseModel}>
      <div className={'Modal-container'}>
        {props.children}
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  children: PropTypes.node,
  setModal: PropTypes.func,
}

Modal.defaultProps = {
  setModal: () => { },
}

export default React.memo(ModalLayout);
