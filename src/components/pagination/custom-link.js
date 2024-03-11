import React from "react";
import { Link, useMatch } from "react-router-dom";
import "./style.css";
function CustomLink({ to, children }) {
  const match = useMatch(to);
  return (
    <Link to={to} className={`custom-link ${match ? "active-link" : ""}`}>
      {children}
    </Link>
  );
}

export default CustomLink;
