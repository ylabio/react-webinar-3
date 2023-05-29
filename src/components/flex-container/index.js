import { memo } from "react";
import "./style.css";

const FlexContainer = ({ children }) => {
  return <div className="flex-container">{children}</div>;
};

export default memo(FlexContainer);
