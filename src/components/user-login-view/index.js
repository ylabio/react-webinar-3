import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Button from '../button';
import './style.css';

const UserLoginView = ({ onLogin, error, t, loading }) => {
  const [loginData, setLoginData] = useState({ login: '', password: '' });

  const cn = bem('UserLogin');

  const handleInputChange = (name, value) => {
    setLoginData(prevState => ({...prevState, [name]: value}));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData);
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{t('login')}</h2>
      <form onSubmit={handleSubmit} className={cn('form')}>
        <div className={cn('form-control')}>
          <label htmlFor="login">{t('login.login')}</label>
          <input
            id="login"
            name="login"
            value={loginData.login}
            onChange={(e) => handleInputChange('login', e.target.value)}
            required
          />
        </div>
        <div className={cn('form-control')}>
          <label htmlFor="password">{t('login.password')}</label>
          <input
            id="password"
            name="password"
            value={loginData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            type="password"
            required
          />
        </div>
        
        {error && <p className={cn('error')}>{error}</p>}
        <div className={cn('submit-button')}>
          <Button disabled={loading}>{t('login.submit')}</Button>
        </div>
      </form>
    </div>
  );
};

UserLoginView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  t: PropTypes.func.isRequired,
};

export default memo(UserLoginView);
