import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Head from "../head";

function Modal({ setModalVisible, children, title }) {
  const closeModal = () => {
    setModalVisible(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div id="myModal" className="Modal">
      <div
        id="modalWrapper"
        onClick={() => closeModal()}
        className="Modal-wrapper"
      >
        <div onClick={(e) => e.stopPropagation()} className="Modal-content">
          <Head title={title}>
            <button
              id="myModalClose"
              className="button-classic"
              onClick={() => closeModal()}
            >
              Закрыть
            </button>
          </Head>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node,
  setModalVisible: PropTypes.func,
};

Modal.defaultProps = {
  setModalVisible: () => {},
};

export default React.memo(Modal);
