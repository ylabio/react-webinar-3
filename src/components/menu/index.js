import React from "react";
import PropTypes from "prop-types";
import "./style.css";
import { Link } from "react-router-dom";
import { memo } from "react";
function Menu({ link, textLink }) {
  //  тут должно было быть че то крутое...
  // что-то вроде renderItem для List для ситуаций когда ссылок много...
  // но так как это последняя попытка не буду изобретать велосипед и предположим что
  // у нас одна ссылка

  return (
    <nav className="Menu">
      <ul className="Menu-list">
        <li className="Menu-item">
          <Link to={link}>{textLink}</Link>
        </li>
      </ul>
    </nav>
  );
}

Menu.propTypes = {
  link: PropTypes.string,
  textLink: PropTypes.string,
};
export default memo(Menu);
