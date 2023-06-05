import React from "react";
import "./style.css";

const FormLayout = ({ children, ...props }) => {
  return (
    <form {...props} className="FormLayout">
      {children}
    </form>
  );
};

export default FormLayout;