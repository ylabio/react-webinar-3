import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";

function Menu({ menuLinks }) {
  const cn = bem("Menu");
  return (
    <ul className={cn()}>
      {menuLinks.map((link) => (
        <Link key={link.to} to={link.to} onClick={link.onClick} className={cn('main-link')}>
          {link.children}
        </Link>
      ))}
    </ul>
  );
}

Menu.propTypes = {
  menuLinks: PropTypes.array
};

Menu.defaultProps = {
  onAdd: () => {},
  menuLinks: []
}

export default memo(Menu);
