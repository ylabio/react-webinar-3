import { memo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';

function LoginForm({ onSubmit, error, t }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const cn = bem('LoginForm');

  const callbacks = {
    handleSubmit: e => {
      e.preventDefault();
      onSubmit({ login, password });
    },
    onLoginChange: e => setLogin(e.target.value),
    onPasswordChange: e => setPassword(e.target.value),
  };

  return (
    <form className={cn()} name="login-form" onSubmit={callbacks.handleSubmit}>
      <h2>{t('user.login')}</h2>
      <div className={cn('item')}>
        <label htmlFor="login">{t('user.login')}</label>
        <input
          id="login"
          placeholder={t('user.login.placeholder')}
          className={cn('input')}
          onChange={callbacks.onLoginChange}
          required
        />
      </div>
      <div className={cn('item')}>
        <label htmlFor="password">{t('user.password')}</label>
        <input
          id="password"
          type="password"
          placeholder={t('user.password.placeholder')}
          className={cn('input')}
          onChange={callbacks.onPasswordChange}
          required
        />
      </div>
      {error && <div className={cn('error')}>{error}</div>}
      <button className={cn('button')} type="submit">
        {t('user.login')}
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  t: PropTypes.func,
};

export default memo(LoginForm);
