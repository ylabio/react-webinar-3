import { cn as bem } from "@bem-react/classname";
import React from "react";
import './style.css'

const Column = ({ children, gap, p }) => {
  const cn = bem("Column");
  return <div className={cn({gap, p})}>{children}</div>;
};

export default Column;