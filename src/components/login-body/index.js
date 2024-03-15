import {memo, useCallback, useState} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from "../../hooks/use-store";

function LoginBody({t}) {

  let [login,setLogin]=useState('')
  let [password,setPassword]=useState('')

  const store = useStore();
  const callbacks = {
    // авторизация
    onLogin: useCallback((data) => store.actions.user.auth(data), [store])
  }

  function sendForm(){
    callbacks.onLogin({login,password})
  }

  const cn = bem('LoginBody');
  let error='Текст ошибки от сервера'
  return (
    <div className={cn()}>
     <h2 className={cn('title')}>Вход</h2>
     <div className={cn('area')}>
      <label htmlFor="login">Логин</label>
      <input id="login" type="text" value={login} onChange={(e)=>setLogin(e.currentTarget.value)}/>
     </div>
     <div className={cn('area')}>
      <label htmlFor="password">Пароль</label>
      <input id="password" type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
     </div>
     {error&&<p className={cn('error')}>{error}</p>}
     <button onClick={sendForm}>Войти</button>
    </div>
  );
}

LoginBody.propTypes = {
  t: PropTypes.func
};

LoginBody.defaultProps = {
  t: (text) => text
}

export default memo(LoginBody);
