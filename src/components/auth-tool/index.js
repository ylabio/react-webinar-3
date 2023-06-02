import {memo} from "react";
import {Link} from "react-router-dom";
import {cn as bem} from "@bem-react/classname";
import './style.css'
import PropTypes from "prop-types";

function AuthTool(props) {
  const cn = bem('AuthTool');

  return (
    <div className={cn()}>
      {props.userName && <div><Link to={props.profilePath} className={cn('link')}>{props.userName}</Link></div>}
      {props.isAuth && <div>
        <button onClick={props.onLogout}>{props.logoutTitle}</button>
      </div>}
      {!props.isAuth && <div>
        <button onClick={props.onLogin}>{props.loginTitle}</button>
      </div>}
    </div>
  )
}

AuthTool.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  profilePath: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout:PropTypes.func.isRequired,
  loginTitle: PropTypes.string.isRequired,
  logoutTitle: PropTypes.string.isRequired,
}

export default memo(AuthTool);
