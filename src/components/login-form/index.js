import { memo } from 'react';
import PropTypes from 'prop-types';
import AuthInput from '../auth-input';
import Button from '../button';
import './style.css';

function LoginForm({ login, password, error, onChangeField, onSubmit, t }) {
  return (
    <div className="login-form">
      <h2>{t('auth.login')}</h2>
      <form onSubmit={onSubmit}>
        <div className="login-form__field">
          <AuthInput 
            value={login}
            onChange={(value) => onChangeField('login', value)}
            placeholder={t('auth.loginPlaceholder')}
          />
        </div>
        <div className="login-form__field">
          <AuthInput 
            value={password}
            onChange={(value) => onChangeField('password', value)}
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
          />
        </div>
        <div className="login-form__error">
          {error && <span>{error}</span>}
        </div>
        <Button 
          type="submit" 
          title={t('auth.loginButton')} 
          style="primary"
        />
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChangeField: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default memo(LoginForm);