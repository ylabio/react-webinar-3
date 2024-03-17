import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
function AuthLayout({ title, children }) {
  const cn = bem("Auth-layout");

  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{title}</h2>
      {children}
    </div>
  );
}

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default memo(AuthLayout);
