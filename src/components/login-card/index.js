import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo, useCallback, useEffect, useState } from 'react';
import Button from '../button';
import Input from '../input';
import './style.css';

function LoginCard({ onLogin = () => {}, clearError = () => {}, error, t = text => text }) {
  const cn = bem('LoginCard');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // Очистка ошибки
  useEffect(() => {
    return () => {
      clearError();
    };
  }, [clearError]);

  const handleInputChange = useCallback((value, name) => {
    if (name === 'login') {
      setLogin(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  }, []);

  return (
    <div className={cn()}>
      <h1>{t('login.title')}</h1>
      <div className={cn('prop-wrapper')}>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.login')}</div>
          <Input
            value={login}
            onChange={handleInputChange}
            placeholder={t('login.login.placeholder')}
            theme="small"
            name="login"
            debounceTime={0}
          />
        </div>
        <div className={cn('prop')}>
          <div className={cn('label')}>{t('login.password')}</div>
          <Input
            value={password}
            onChange={handleInputChange}
            placeholder={t('login.password.placeholder')}
            theme="small"
            name="password"
            type="password"
            debounceTime={0}
          />
        </div>
        {error && <div className={cn('error')}>{error}</div>}
      </div>
      <Button style="primary" onClick={() => onLogin(login, password)} title={t('login.button')} />
    </div>
  );
}

LoginCard.propTypes = {
  onLogin: PropTypes.func,
  clearError: PropTypes.func,
  error: PropTypes.string,
  t: PropTypes.func,
};

export default memo(LoginCard);
