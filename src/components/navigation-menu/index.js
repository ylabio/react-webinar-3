import { Link } from "react-router-dom";

import "./style.css";

export const NavigationMenu = () => {
  return (
    <nav className="navigation">
      <Link to={"/?page=1"} className="mainLink">
        Главная
      </Link>
    </nav>
  );
};
