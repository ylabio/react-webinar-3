import React, { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function SideLayout({ children, side, padding, border, spaced }) {
  const cn = bem("SideLayout");
  return (
    <div className={cn({ side, padding, border, spaced })}>
      {React.Children.map(children, (child) => (
        <div
          key={child.key}
          className={!spaced ? cn("item") : cn("item_spaced")}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(["start", "end", "between"]),
  padding: PropTypes.oneOf(["small", "medium", "10x20"]),
};

SideLayout.defaultProps = {};

export default memo(SideLayout);
