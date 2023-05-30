import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import useTranslate from "../../store/use-translate";
import "./style.css";

function NavMenu() {

  const links = [
    {
      title: useTranslate('mainLink'),
      link: "/",
    },
  ];

  return (
    <ul className="nav-menu">
      {links.map((link, index) => {
        return (
          <li key={index}>
            <NavLink to={link.link} className="nav-menu__link">
              {link.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default memo(NavMenu);
