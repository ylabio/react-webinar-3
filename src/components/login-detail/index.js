import {memo, useState} from "react";
import Spinner from "../spinner";
import './style.css';
function LoginDetail({waiting, errorMessage, onLogin, t}) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onLogin(login, password);
  }

  const handleLogin = (e) => {
    setLogin(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const disableButton = () => {
    return !(login.trim().length > 0 && password.trim().length > 0) || waiting;
  }

  return (
    <form onSubmit={handleSubmit} className="LoginDetail">
      <h2>{t('login-page.title')}</h2>
      <Spinner active={waiting}>
        <label>
          <span>{t('login-page.login')}</span>
          <input value={login} onChange={handleLogin} name="login" type="text"/>
        </label>
        <label>
          <span>{t('login-page.password')}</span>
          <input value={password} onChange={handlePassword} name="password" type="password"/>
        </label>
        {errorMessage.length > 0 && errorMessage.map((error, idx) => <p key={idx} className="error">{error}</p>)}
        <button disabled={disableButton()} type="submit">{t('login-page.button')}</button>
      </Spinner>
    </form>
  );
}

export default memo(LoginDetail);
