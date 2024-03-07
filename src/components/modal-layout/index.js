import React from "react";
import PropTypes from "prop-types";
import "./style.css";

const ModalLayout = ({ children }) => {
  return (
    <>
      <article className="ModalLayout">
        <section className="ModalLayout-content">{children}</section>
      </article>
    </>
  );
};

ModalLayout.propTypes = {
  children: PropTypes.node
};

export default React.memo(ModalLayout);
