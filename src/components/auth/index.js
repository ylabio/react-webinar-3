import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import { NavLink } from "react-router-dom";
import './style.css';

function Auth({t,userName,isAuth,logout,NavigateTo,link,buttonLogIn,buttonLogOut}) {


  const cn = bem('Auth');
  return (
    <div className={cn()}>
      {userName&& <NavLink to={link}>{userName}</NavLink>}
      {isAuth?
      <button onClick={logout}>{buttonLogOut}</button>:
      <button onClick={NavigateTo}>{buttonLogIn}</button>
      }
     
    </div>
  );
}

Auth.propTypes = {
  t: PropTypes.func,
  logout: PropTypes.func,
  NavigateTo: PropTypes.func,
  userName:PropTypes.string,
  link:PropTypes.string,
  buttonLogIn:PropTypes.string,
  buttonLogOut:PropTypes.string,
  isAuth:PropTypes.bool
};

Auth.defaultProps = {
  t: (text) => text,
  logout:()=>{}
}

export default memo(Auth);
