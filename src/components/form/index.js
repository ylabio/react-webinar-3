import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';

import './style.css';

function Form(props) {
  // Внутренний стейт формы
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  // Обработчики изменения значений формы
  const onLoginChange = (event) => {
    props.setError('');
    setLoginValue(event.target.value);
  };
  const onPasswordChange = (event) => {
    props.setError('');
    setPasswordValue(event.target.value);
  };

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.onSubmit({
        login: loginValue,
        password: passwordValue,
      });
    },
  };

  useEffect(() => {
    props.setError('');
  }, []);

  const cn = bem('Form');
  return (
    <>
      <h2 className={cn('title')}>{props.title}</h2>
      <form className={cn()} onSubmit={callbacks.onSubmit}>
        <label className={cn('label')}>
          {props.loginLabel}
          <input
            className={cn('input')}
            value={loginValue}
            type='text'
            name='login'
            required
            onChange={onLoginChange}
          />
        </label>

        <label className={cn('label')}>
          {props.passwordLabel}
          <input
            className={cn('input')}
            value={passwordValue}
            type='password'
            name='password'
            required
            onChange={onPasswordChange}
          />
        </label>
        {props.error && <span className={cn('error')}>{props.error}</span>}
        <button className={cn('btn')} type='submit'>
          {props.btnLogin}
        </button>
      </form>
    </>
  );
}

Form.propTypes = {
  loginLabel: PropTypes.string,
  passwordLabel: PropTypes.string,
  btnLogin: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  setError: PropTypes.func,
};

Form.defaultProps = {
  loginLabel: 'Логин',
  passwordLabel: 'Пароль',
  btnLogin: 'Войти',
  error: '',
  onSubmit: () => {},
  setError: () => {},
};

export default memo(Form);
