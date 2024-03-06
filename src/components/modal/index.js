import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

const Modal = ({ active, setActive, children }) => {
  const cn = bem("Modal");

  return (
    <div
      className={active ? cn() + " " + cn("active") : cn()}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? cn("content") + " " + cn("active") : cn("content")}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
  children: PropTypes.node,
};

Modal.defaultProps = {
  setActive: () => {},
};

export default React.memo(Modal);
