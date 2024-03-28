import React, { memo } from "react";
import "./style.css";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Field from "../field";
import Input from "../input";
import { Link } from "react-router-dom";

function CommentsLayout({ children, title }) {
  const cn = bem("CommentsLayout");
  return (
    <div className={cn()}>
      <h2 className={cn("title")}>{title}</h2>
      {children}
    </div>
  );
}

CommentsLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  footer: PropTypes.node,
};

export default memo(CommentsLayout);
