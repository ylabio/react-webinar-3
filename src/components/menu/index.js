import { cn as bem } from "@bem-react/classname";
import React from "react";
import { NavLink } from "react-router-dom";
import "./style.css";

const Menu = () => {
  const cn = bem("Menu");
  return (
    <nav className={cn()}>
      <ul className={cn("list")}>
        <li className={cn("item")}>
          <NavLink className={cn("link")} to="/">
            Главная
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
