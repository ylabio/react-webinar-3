import { memo } from 'react';
import PropTypes from 'prop-types';
import Input from '../input';
import Button from '../button';
import './style.css';

function LoginForm({ login, password, error, onChangeLogin, onChangePassword, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="Login-form">
      <h1>Вход</h1>
      <div className="form">
        <div className="input">
          <span>Логин</span>
          <Input value={login} onChange={onChangeLogin} placeholder="Введите логин" />
        </div>
        <div className="input">
          <span>Пароль</span>
          <Input
            value={password}
            onChange={onChangePassword}
            placeholder="Введите пароль"
            type="password"
          />
        </div>
        <div className="error">{error && <div className="error-text">{error}</div>}</div>
      </div>
      <div className={`button ${!error ? 'no-error' : ''}`}>
        <Button style="primary" type="submit" title="Войти" />
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
