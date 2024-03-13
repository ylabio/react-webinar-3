import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { NavLink } from "react-router-dom";
import { codeGenerator } from "../../utils";

function Navbar({ navList, children }) {
  const cn = bem("Navbar");
  const list = bem("NavList");

  return (
    <div className={cn()}>
      <ul className={`${cn("list")} ${list()}`}>
        {navList.map(({ name, path }) => (
          <li key={codeGenerator()}>
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

export default React.memo(Navbar);
