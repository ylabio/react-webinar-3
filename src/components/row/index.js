import { cn as bem } from "@bem-react/classname";
import React from "react";
import "./style.css";

function Row({ children }) {
  const cn = bem("Row");
  return <div className={cn()}>{children}</div>;
}

export default Row;
