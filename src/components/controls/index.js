import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls({ onClick, text }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <button className={cn("button")} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Controls.defaultProps = {
  onAdd: () => {},
  text: "",
};

export default React.memo(Controls);