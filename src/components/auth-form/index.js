import './style.css';
import Input from "../input";
import {useEffect, useState} from "react";
import Button from "../button";

function AuthForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(true);
  useState('')

  useEffect(() => {
    console.log(login);
  },[login])
  return (
    <div className="AuthForm">
      <h1 className="AuthForm-title">Вход</h1>
      <form className={`AuthForm-form${isError ? ' error' : ''}`} action="">
        <label>
          <h4>Логин</h4>
          <Input
            value={login}
            onChange={setLogin}
            placeholder={'Введите логин'}
            delay={1000}
            theme={'small'}
          />
        </label>
        <label className={`AuthForm-pass${isError ? ' error' : ''}`}>
          <h4>Пароль</h4>
          <Input
            value={password}
            onChange={setPassword}
            placeholder={'Введите пароль'}
            delay={1000}
            theme={'small'}
          />
        </label>
        {isError && <div className="AuthForm-error">Текст ошибки от сервера</div>}
        <Button style="primary" type="submit" title={'Войти'}></Button>
      </form>
    </div>
  );
}

export default AuthForm;
