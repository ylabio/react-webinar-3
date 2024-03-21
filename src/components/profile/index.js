import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import {useNavigate} from 'react-router-dom'
import './style.css';

function Profile({user, isAuth}) {
  const cn = bem('Profile');

  const navigate = useNavigate();

  if(!isAuth) navigate('/login');

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
