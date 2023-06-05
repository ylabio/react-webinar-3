import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm({onSubmit, error, isSuccess}) {
  return (
    <form onSubmit={onSubmit} className="LoginForm">
      <label className="LoginForm-item">
        <div>Логин</div>
        <input type="text" />
      </label>
      <label className="LoginForm-item">
        <div>Пароль</div>
        <input type="password" />
      </label>
      {error && <div className="LoginForm-error">{error}</div>}
      <div className="LoginForm-success">{isSuccess && 'Авторизация прошла успешно!'}</div>
      <button type="submit">Войти</button>
    </form>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
  onSubmit: () => {},
}

export default memo(LoginForm);
