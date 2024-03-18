import React from 'react'
import {cn as bem} from '@bem-react/classname';
import './style.css';

const ProfileCard = ({data}) => {

  const cn = bem('ProfileCard');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Профиль</h2>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>Имя:</p>
          <span className={cn('info-text_bold')}>{data.profile?.name}</span>
        </div>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>Телефон:</p>
          <span className={cn('info-text_bold')}>{data.profile?.phone}</span>
        </div>
        <div className={cn('info-container')}>
          <p className={cn('info-text')}>email:</p>
          <span className={cn('info-text_bold')}>{data.email}</span>
        </div>
    </div>
  )
}

export default ProfileCard