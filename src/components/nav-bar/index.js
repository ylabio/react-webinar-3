import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function NavBar({ children }) {
  const cn = bem('NavBar')
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

NavBar.propTypes = {
  children: PropTypes.node,
};

export default memo(NavBar);
