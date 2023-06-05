import SideLayout from "../side-layout";
import {Link} from "react-router-dom";
import {memo} from "react";
import './style.css';

function LoginSide({loginStatus, userName, onLogout, t}) {
  const handleLogout = () => {
    onLogout();
  }
  return (
    <SideLayout side='end' border='bottom'>
      {loginStatus ? <>
        <Link to={'/profile'}>{userName}</Link>
        <button onClick={handleLogout} className="buttonLogin">{t('login-side.logout')}</button>
      </> : <Link to={'/login'}><button className="buttonLogin">{t('login-side.login')}</button></Link>}
    </SideLayout>
  );
}

export default memo(LoginSide);