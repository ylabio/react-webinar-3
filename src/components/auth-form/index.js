import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';
import Input from '../input';

function AuthForm({ onSubmit, t, error }) {
  const cn = bem('Authform');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onLogin: value => setLogin(value),
    onPass: value => setPassword(value),
    onSubmit: e => {
      e.preventDefault();
      onSubmit({ login, password });
    },
  };

  return (
    <form className={cn()} onSubmit={callbacks.onSubmit}>
      <h2 className={cn('header')}>Вход</h2>
      <div className={cn('input-block')}>
        <label htmlFor="login">Логин</label>
        <Input
          placeholder={'Введите логин'}
          theme={'small'}
          id={'login'}
          onChange={callbacks.onLogin}
          delay={0}
        />
      </div>
      <div className={cn('input-block')}>
        <label htmlFor="password">Пароль</label>
        <Input
          id={'password'}
          placeholder={'Введите пароль'}
          theme={'small'}
          type={'password'}
          onChange={callbacks.onPass}
          delay={0}
        />
      </div>
      <span className={cn('error')}>{error}</span>
      <Button style="primary" title={`${t('auth.login')}`} type="submit" />
    </form>
  );
}

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default memo(AuthForm);
