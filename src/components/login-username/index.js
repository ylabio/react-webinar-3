import {memo} from "react";
import './style.css';
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";

function LoginUsername({username}) {
  const cn = bem('LoginUsername');

  if (username) {
    return <Link to={"/profile"} className={cn()}>{username}</Link>
  }

  return;
}

export default memo(LoginUsername);
