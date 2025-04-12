import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Button from '../button';
import { cn as bem } from '@bem-react/classname';


function LoginForm({ error, onSubmit = () => {}, t }) {
  const cn = bem('LoginForm');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    handleSubmit: (e) => {
    e.preventDefault();
    onSubmit({ login, password });
    }
  };

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <form className={cn('form')} onSubmit={callbacks.handleSubmit}>
        <div className={cn('input-container')}>
          <div>
            <label htmlFor="login">{t('login.login')}</label>
            <input 
              value={login}
              placeholder={t('login.loginPlaceholder')}
              id="login"
              onChange={(e) => setLogin(e.target.value)}
              className={cn('input')}
              required />
          </div>
          <div>
            <label htmlFor="password">{t('login.password')}</label>
            <input
              value={password}
              placeholder={t('login.passwordPlaceholder')}
              id="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              className={cn('input')} />
          </div>
          <div className={cn('errors')}>{error && <span>{error}</span>}</div>
        </div>
        <Button title={t('login.submit')} style="primary" type="submit"/>
      </form>
    </div>
  )
}

LoginForm.PropTypes = {
  error: PropTypes.string,
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default memo(LoginForm);