import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from '../input';
import Button from '../button';

function LoginFormView({ login, pass, error, onLoginChange, onPassChange, onSubmit, t }) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <span className={cn('title')}>{t('login')}</span>
      <div className={cn('container')}>
        <div className={cn('fields')}>
          <div className={cn('field')}>
            <span className={cn('label')}>Логин</span>
            <Input value={login} onChange={onLoginChange} placeholder={'Введите логин'} />
          </div>
          <div className={cn('field')}>
            <span className={cn('label')}>Пароль</span>
            <Input value={pass} onChange={onPassChange} placeholder={'Введите пароль'} />
          </div>
          {error && <span className={cn('error')}>{error}</span>}
        </div>
      </div>
      <Button onClick={onSubmit} className={cn('button')} style={'primary'} title={t('login')} />
    </div>
  );
}

export default LoginFormView;
