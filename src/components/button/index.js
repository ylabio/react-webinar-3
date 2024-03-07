import React from "react";
import "./style.css";

const Button = ({ handleModal, children }) => {
  return (
    <button className="Button" onClick={() => handleModal()}>
      {children}
    </button>
  );
};

export default Button;
