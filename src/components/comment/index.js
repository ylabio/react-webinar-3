import React from 'react'
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Comment({text, date, level}) {
  const cn = bem('Comment')

  const normalizeDate = new Date(date).toLocaleDateString('ru-RU')

  return (
    <div className={cn()} style={{paddingLeft: `${30 * level}px` }} >

      <div className={cn('header')}>
        <span className={cn('user-name')}>Имя</span>
        <span className={cn('date')}>{normalizeDate}</span>
      </div>

      <p className={cn('message')}>{text}</p>

      <button className={cn('reply-button')}>Ответить</button>
    </div>
  )
}

export default Comment