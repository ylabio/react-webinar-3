import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginPage(props) {

  const cn = bem('LoginPage');

  const onSetLogin = (event) => {
    props.onSetLogin(event.target.value);
  }

  const onSetPassword= (event) => {
    props.onSetPassword(event.target.value);
  }

  return (
    <div className={cn()}>
      <h3>Вход</h3>
      <form className={cn('form')} action="" onSubmit={props.onSubmit}>
        <label className={cn('label')} htmlFor="login">Логин</label>
        <input className={cn('input')} type="text" id='login' onChange={onSetLogin}/>
        <label className={cn('label')} htmlFor="password">Пароль</label>
        <input className={cn('input')} type="password" id='password' onChange={onSetPassword}/>
        {props.error && <div className={cn('error-message')}>{props.error.message}</div>}
        <button className={cn('button')} type='submit'>Войти</button>
      </form>
    </div>
  )
}

LoginPage.propTypes = {
  error: PropTypes.object,
  onSetLogin: PropTypes.func,
  onSetPassword: PropTypes.func,
  onSubmit: PropTypes.func,
}

LoginPage.defaultProps = {
  onSetLogin: () => {},
  onSetPassword: () => {},
  onSubmit: () => {},
}

export default memo(LoginPage);