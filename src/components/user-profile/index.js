import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function UserProfile({user}) {
  const cn = bem('UserProfile');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
      <div className={cn('wrapper')}>
        <div className={cn('text')}>Имя: <span>{user.profile.name}</span></div>
        <div className={cn('text')}>Телефон: <span>{user.profile.phone}</span></div>
        <div className={cn('text')}>email: <span>{user.email}</span></div>
      </div>
    </div>
  );
}

export default UserProfile;