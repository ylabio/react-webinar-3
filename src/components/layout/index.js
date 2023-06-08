import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

const Layout = ({ children, styles }) => {
  const cn = bem("Layout");
  return <div className={cn(styles)}>{children}</div>;
};

export default Layout;
