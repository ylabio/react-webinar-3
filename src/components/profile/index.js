import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Profile({user}) {
  const cn = bem('Profile');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('item')}><span>Имя:</span> <b>{user?.profile?.name}</b></div>
      <div className={cn('item')}><span>Телефон:</span> <b>{user?.profile?.phone}</b></div>
      <div className={cn('item')}><span>email:</span> <b>{user?.email}</b></div>
    </div>
  )
}

Profile.propTypes = {};

export default memo(Profile);
