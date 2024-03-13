import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";

import "./style.css";

function Tabs({ children }) {
  const cn = bem("Tabs");
  return <div className={cn()}>{children}</div>;
}

Tabs.propTypes = {
  children: PropTypes.node,
};

export default memo(Tabs);
