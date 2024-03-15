import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LoginForm(props) {
  const cn = bem('LoginForm');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onLogIn(event.target[0].value, event.target[1].value)
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2 className={cn('title')}>{props.title}</h2>
      <label className={cn('label')}>
        {props.login}
        <input type='text' />
        </label>
      <label className={cn('label')}>
        {props.password}
        <input type='password' />
        </label>
        {props.error && <p className={cn('error')}>{props.error.message}</p>}
      <button type="submit">{props.button}</button>
    </form>
  )
}

LoginForm.propTypes = {
  title: PropTypes.string,
  login: PropTypes.string,
  password: PropTypes.string,
  error: PropTypes.object,
  onLogIn: PropTypes.func,
}

LoginForm.defaultProps = {
  title: 'Вход',
  login: 'Логин',
  password: 'Пароль',
  error: {
    message: ''
  },
  onLogIn: () => {},
}

export default memo(LoginForm);
