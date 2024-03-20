import React, {memo} from 'react';
import PropTypes from 'prop-types';
import 'style.css';
import {cn as bem} from "@bem-react/classname";

const FormAuthorization = ({onSign,  onChangeInput, error, userData}) => {

  const cn = bem('Form');

  return (
    <form onSubmit={onSign} className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <label htmlFor="login">Логин</label>
      <input
        className={cn('input')}
        id="login"
        name="login"
        value={userData.login}
        onChange={(e) => onChangeInput('login', e.target.value)}
        type='text'
        required
      />
      <label htmlFor="password">Пароль</label>
      <input
        className={cn('input')}
        id="password"
        name="password"
        value={userData.password}
        onChange={(e) => onChangeInput('password', e.target.value)}
        type='password'
        required
      />
      {error && <p className={cn('error')}>{error}</p>}
      <button  type='submit'>Войти</button>
    </form>

  )
}

FormAuthorization.propTypes = {
  userData: PropTypes.object.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  onSign: PropTypes.func.isRequired,
  error: PropTypes.string,
};

export default memo(FormAuthorization);