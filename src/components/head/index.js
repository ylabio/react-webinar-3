import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import Button from "../button";

function Head({ title, handleModal, children }) {
  return (
    <div className="Head">
      <h1>{title}</h1>
      {title === "Корзина" ? (
        <Button handleModal={handleModal}>{children}</Button>
      ) : null}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  handleModal: PropTypes.func,
};

export default React.memo(Head);
