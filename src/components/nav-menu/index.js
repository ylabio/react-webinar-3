import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function NavMenu({ children }) {
  const cn = bem("NavMenu");
  return (
    <div className={cn()}>
      <div className={cn("navigation")}>
        <Link className={cn("link")} to="/">
          Главная
        </Link>
      </div>
      {children}
    </div>
  );
}

NavMenu.propTypes = {
  children: PropTypes.node,
};

export default memo(NavMenu);
