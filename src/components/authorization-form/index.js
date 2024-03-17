import React from 'react';
import {cn as bem} from '@bem-react/classname';
import Input from "../input";
import './style.css';

function AuthorizationForm({value, onInput, t}) {
  const cn = bem('AuthorizationForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>Вход</div>
      <div className={cn('group')}>
        <label>Логин</label>
        <Input value={value} onChange={onInput} />
      </div>
      <div className={cn('group')}>
        <label>Пароль</label>
        <Input value={value} onChange={onInput} />
      </div>
      <button>Войти</button>
    </div>
  );
}

export default AuthorizationForm;