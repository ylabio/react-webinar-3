import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Navigate } from "react-router-dom";

function Profile({user, isAuth}) {
  const cn = bem('Profile');

  if(!isAuth) return <Navigate to={'/login'}/>

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('item')}><span>Имя:</span> <b>{user?.profile?.name}</b></div>
      <div className={cn('item')}><span>Телефон:</span> <b>{user?.profile?.phone}</b></div>
      <div className={cn('item')}><span>email:</span> <b>{user?.email}</b></div>
    </div>
  )
}

Profile.propTypes = {
  isAuth: PropTypes.bool
};

export default memo(Profile);
