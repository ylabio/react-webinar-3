import { memo } from "react";

import "./style.css"
import { Link } from "react-router-dom";

function LogoutUserButton(props) {


  return (
    <>
      <Link className="LogoutUserButton-name" to={"/profile"}>{props.userName}
      </Link>
      <button className="LogoutUserButton-button" type="button" onClick={props.logOut}>Выход
      </button>
    </>
  );
}

export default memo(LogoutUserButton);
