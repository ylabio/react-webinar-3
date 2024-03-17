import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link, useNavigate} from "react-router-dom";

function UserMenu({links, isAuth, logOut}) {

  const cn = bem('UserMenu')

  const navigate = useNavigate()

  return (
    <div className={cn()}>
      {
        isAuth ?
          <>
            <Link to={links.profile}>User №1</Link>
            <button onClick={() => logOut()}>Выход</button>
          </>
          :
          <button onClick={() => navigate(links.login)}>Вход</button>
      }
    </div>
  )
}

UserMenu.PropTypes = {
  links: PropTypes.shape({
    profile: PropTypes.string
  }),
  isAuth: PropTypes.bool,
  logOut: PropTypes.func
}

UserMenu.defaultProps = {
  logOut: () => {}
}

export default React.memo(UserMenu);