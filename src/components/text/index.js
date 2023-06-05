import React from "react";
import "./style.css";

const Text = ({ type, children }) => {
  return <p className={`Text ${type ?? ""}`}>{children}</p>;
};

export default Text;