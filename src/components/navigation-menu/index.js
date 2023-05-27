import { Link } from "react-router-dom";
import BasketTool from "../basket-tool";

import "./style.css";

export const NavigationMenu = (props) => {
  return (
    <nav className="navigation">
      <Link to={"/?page=1"} className="mainLink">
        Главная
      </Link>

      <BasketTool sum={props.sum} amount={props.amount} onOpen={props.onOpen} />
    </nav>
  );
};
