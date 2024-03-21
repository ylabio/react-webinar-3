import { memo, useState } from "react";
import "./style.css"

export function LoginForm(props) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    props.onSubmitForm({ password, login })
    setPassword('');
  }

  const handleChange = ({ target: { name, value } }) => {
    name === 'login' ? setLogin(value) : setPassword(value);
  }

  return (
    <div className="LoginForm">
      <h2 className="LoginForm-title">Вход</h2>
      <form onSubmit={handleSubmit}>
        <div className="LoginForm-container">
          <label htmlFor="login">Логин</label>
          <input
            name="login"
            type="text"
            id="username"
            value={login}
            onChange={handleChange}
          />
        </div>
        <div className="LoginForm-container">
          <label htmlFor="password">Пароль</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {props.error && <p className="LoginForm-error">{props.error}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default memo(LoginForm);