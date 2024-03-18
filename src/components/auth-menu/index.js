import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";

function AuthMenu({isAuth, username, onLogout}) {

  const {t} = useTranslate();
  
  return (
    <SideLayout side='end' padding='small-medium'>
      <div className="AuthMenu">
        {username && isAuth && (
          <Link to='/profile'>{username}</Link>
        )}
        {isAuth ? (
          <button className="AuthMenu-btn" onClick={onLogout}>{t('auth.logout')}</button>
        ) : (
          <button className="AuthMenu-btn">
            <Link to="/login" className="AuthMenu-link">{t('auth.login')}</Link>
          </button>
        )}
      </div>
    </SideLayout>
  )
}

AuthMenu.propTypes = {
};

export default memo(AuthMenu);
