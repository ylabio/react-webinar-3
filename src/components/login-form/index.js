import {memo, useCallback, useState} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Input from "../input";
import PropTypes from "prop-types";
import Spinner from "../spinner";

function LoginForm(props) {
  const cn = bem('LoginForm');

  const [login, setLogin] = useState('test_1');
  const [password, setPassword] = useState('123456');

  const callback = {
    setLogin: useCallback(value => setLogin(value), []),
    setPassword: useCallback(value => setPassword(value), []),
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit({login, password})
    }
  }

  return (
    <Spinner active={props.loginWaiting}>
      <form className={cn()} onSubmit={callback.onSubmit}>
        <div className={cn('form-title')}>Вход</div>
        <div>
          <label className={cn('label')}>Логин</label>
          <Input
            value={login}
            onChange={callback.setLogin}
            debounceTimeout={0}
          />
        </div>
        <div>
          <label className={cn('label')}>Пароль</label>
          <Input
            debounceTimeout={0}
            value={password}
            onChange={callback.setPassword}
          />
        </div>

        {props.error && <div className={cn('error')}>{props.error}</div>}

        <div>
          <button type={'submit'}>Войти</button>
        </div>


      </form>
    </Spinner>
  );
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  loginWaiting: PropTypes.bool.isRequired
};


export default memo(LoginForm);
