import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Head({ title, cartComponent, onModalActive }) {
  const cn = bem("Head");

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      {cartComponent ? (
        <button onClick={() => onModalActive(false)}>Закрыть</button>
      ) : null}
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
