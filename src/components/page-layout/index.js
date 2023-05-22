import React from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function PageLayout({ children, isModal }) {
  const cn = bem("PageLayout");

  return (
    <div className={isModal ? `${cn() + " PageLayout-shopping-cart"}` : cn()}>
      <div className={cn("center")}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
  isModal: PropTypes.bool,
};

export default React.memo(PageLayout);
