import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { NavLink } from "react-router-dom";
import { codeGenerator } from "../../utils";
import PropTypes from "prop-types";

function Navbar({ navList, children }) {
  const cn = bem("Navbar");
  const list = bem("NavList");

  const uniqKey = codeGenerator(500);

  return (
    <div className={cn()}>
      <ul className={`${cn("list")} ${list()}`}>
        {navList.map(({ name, path }) => (
          <li key={uniqKey()}>
            <NavLink className={list("item")} to={path}>
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}

Navbar.defineProps = {
  navList: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, path: PropTypes.string })
  ),
  children: PropTypes.node,
};

export default React.memo(Navbar);
