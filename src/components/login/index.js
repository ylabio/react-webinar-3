import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import { Navigate } from "react-router-dom";
import './style.css';

function Login({getAuthorization, error, isAuth}) {
  const cn = bem('Login');

  const [login, setLogin] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = async (event) =>{
    event.preventDefault();

    const body = {
      login,
      password
    };

    getAuthorization(body);

    setLogin('');
    setPassword('');
  }

  if(isAuth) return <Navigate to='/'/>

  return (
    <div className={cn()}>
        <h2 className={cn('title')}>Вход</h2>
        <form className={cn('form')} onSubmit={handleSubmit}>
          <div className={cn('item')}>
            <label>Логин</label>
            <input required value={login} onChange={(e) => setLogin(e.target.value)}/>
          </div>
          <div className={cn('item')}>
            <label>Пароль</label>
            <input type="password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
          </div>
          {error && <div className={cn('error')}>{error}</div>}
          <div className={cn('item')}>
            <button className={cn('button')}>Войти</button>
          </div>
        </form>
      </div>
  )
}

Login.propTypes = {
  getAuthorization: PropTypes.func,
  error: PropTypes.string,
  isAuth: PropTypes.bool
};

export default memo(Login);
