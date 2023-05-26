import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../store/translation";
import './style.css'

const Menu = ({ links }) => {

	const {t} = useTranslation()

  return (
    <ul>
      {links.map((el) => (
        <li className="Menu-item">
          <Link to={el.path}>{t(el.title)}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
