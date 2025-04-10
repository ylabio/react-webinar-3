import { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Button from '../button';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function LoginForm({ login, password, error, onChangeLogin, onChangePassword, onSubmit }) {
  const { t } = useTranslate();

  return (
    <form onSubmit={onSubmit} className="Login-form">
      <h1>{t('login.title')}</h1>
      <div className="form">
        <div className="input">
          <span>{t('login.login')}</span>
          <Input
            value={login}
            onChange={onChangeLogin}
            placeholder={t('login.placeholder.login')}
          />
        </div>
        <div className="input">
          <span>{t('login.password')}</span>
          <Input
            value={password}
            onChange={onChangePassword}
            placeholder={t('login.placeholder.password')}
            type="password"
          />
        </div>
        <div className="error">{error && <div className="error-text">{error}</div>}</div>
      </div>
      <div className={`button ${!error ? 'no-error' : ''}`}>
        <Button style="primary" type="submit" title={t('login.submit')} />
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeLogin: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(LoginForm);
