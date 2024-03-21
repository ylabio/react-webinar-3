import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import React, { memo } from "react";
import "./style.css";

function SideLayout({ children, side, padding, borderBottom }) {
  const cn = bem("SideLayout");
  return (
    <div className={cn({ side, padding, border: borderBottom })}>
      {React.Children.map(children, (child) => (
        <div key={child.key} className={cn("item")}>
          {child}
        </div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(["start", "end", "between"]),
  padding: PropTypes.oneOf(["small", "medium"]),
  borderBottom: PropTypes.bool,
};

SideLayout.defaultProps = {};

export default memo(SideLayout);
