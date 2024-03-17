import React, {memo} from 'react';
import {cn as bem} from "@bem-react/classname";
import  './style.css';

const ProfileLayout = ({user}) => {

  const cn = bem('Profile');

  if(!user) {
    return <div className={cn()}>Нет данных</div>
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('item')}>Имя: <b>{user?.username}</b></div>
      <div className={cn('item')}>Телефон: <b>{user?.profile.name}</b></div>
      <div className={cn('item')}>email: <b>{user?.profile.phone}</b></div>
    </div>
  )
}

export default memo(ProfileLayout);
