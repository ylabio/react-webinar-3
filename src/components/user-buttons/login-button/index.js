import { memo } from "react";

import "./style.css"
import { Link } from "react-router-dom";

function LoginUserButton() {


  return (
    <Link className="LoginUserButton-button" to="/login" >Вход</Link>
  );
}

export default memo(LoginUserButton);



