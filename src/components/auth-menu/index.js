import {memo} from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import './style.css';
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../side-layout";

function AuthMenu({isAuth, onLogout, children}) {

  const {t} = useTranslate();
  
  return (
    <div className="AuthMenu">
      {children}
      {isAuth ? (
        <button className="AuthMenu-btn" onClick={onLogout}>{t('auth.signout')}</button>
      ) : (
        <button className="AuthMenu-btn">
          <Link to="/login" className="AuthMenu-link">{t('auth.signin')}</Link>
        </button>
      )}
    </div>
  )
}

AuthMenu.propTypes = {
  isAuth: PropTypes.bool,
  username: PropTypes.string,
  AuthMenu: PropTypes.func,
};

AuthMenu.defaultProps = {
  AuthMenu: () => {
  },
}

export default memo(AuthMenu);
