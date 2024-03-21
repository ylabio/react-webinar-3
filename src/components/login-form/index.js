import { memo, useState } from "react";
import PropTypes from "prop-types";
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
      <h2 className="LoginForm-title">{props.title}</h2>
      <form onSubmit={handleSubmit}>
        <div className="LoginForm-container">
          <label htmlFor="login">{props.login}</label>
          <input
            name="login"
            type="text"
            id="username"
            value={login}
            onChange={handleChange}
          />
        </div>
        <div className="LoginForm-container">
          <label htmlFor="password">{props.password}</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        {props.error && <p className="LoginForm-error">{props.error}</p>}
        <button type="submit">{props.buttonText}</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  title: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  buttonText: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired
};

export default memo(LoginForm);