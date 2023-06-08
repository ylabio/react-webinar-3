import { cn as bem } from "@bem-react/classname";
import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Button = ({ styles, type, children, ...props }) => {
  const cn = bem("Button");

  switch (type) {
    case "link":
      return (
        <Link {...props} className={cn(styles)}>
          {children}
        </Link>
      );
    default:
      return (
        <button {...props} className={cn(styles)}>
          {children}
        </button>
      );
  }
};

export default Button;
