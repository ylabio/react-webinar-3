import PropTypes from "prop-types";
import React from "react";
import Head from "../head";
import "./style.css";

const Modal = ({title, children, onClose, buttonText}) => {
  return (
    <div className="Modal">
      <Head title={title}>
        <button className="Modal-button" onClick={onClose}>{buttonText}</button>
      </Head>
      {children}
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
	title: PropTypes.string,
	onClose: PropTypes.func
};

export default React.memo(Modal);