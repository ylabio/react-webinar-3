import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link, useNavigate} from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function UserMenu({links, isAuth, logOut, userName, t}) {

  const cn = bem('UserMenu')

  const navigate = useNavigate()

  return (
    <div className={cn()}>
      {
        isAuth ?
          <>
            <Link to={links.profile} className={cn(('name'))}>{userName}</Link>
            <button onClick={() => logOut()}>{t('logout')}</button>
          </>
          :
          <button onClick={() => navigate(links.login)}>{t('login')}</button>
      }
    </div>
  )
}

UserMenu.PropTypes = {
  links: PropTypes.shape({
    profile: PropTypes.string
  }),
  userName: PropTypes.string,
  isAuth: PropTypes.bool,
  logOut: PropTypes.func,
  t: PropTypes.func
}

UserMenu.defaultProps = {
  logOut: () => {},
  t: (text) => text
}

export default React.memo(UserMenu);