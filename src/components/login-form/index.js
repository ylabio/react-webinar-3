import {memo, useState} from "react";
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import Input from "../input";
import './style.css';

function LoginForm(props) {

  const cn = bem('LoginForm');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const callbacks = {
    onLogin: (e) => props.onClickLogin(login, password),
    onKeyDown: event => { if (event.key === 'Enter') { props.onClickLogin(login, password) }},
    t: text => props.t(text)
  }

  return (
    <div className={cn()}>
      <h2>{callbacks.t('profile.login')}</h2>
      <div className={cn('body')}>
        <div className={cn('field')}>
          <label>{callbacks.t('profile.username')}</label>
          <Input name='login' value={login} onChange={setLogin} onKeyDown={callbacks.onKeyDown} autoFocus={true} disabled={props.waiting}/>
        </div>
        <div className={cn('field')}>
          <label>{callbacks.t('profile.password')}</label>
          <Input type='password' value={password} onChange={setPassword} onKeyDown={callbacks.onKeyDown} disabled={props.waiting}/>
        </div>
        { props.message && <div className={cn('message')}>{props.message}</div> }
        <button onClick={callbacks.onLogin} disabled={props.waiting}>{callbacks.t('profile.enter')}</button>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  waiting: PropTypes.bool,
  message: PropTypes.string,
  t: PropTypes.func,
  onClickLogin: PropTypes.func
};

LoginForm.defaultProps = {
  waiting: false,
  message: '',
  t: (text) => text,
  onClickLogin: () => {}
}

export default memo(LoginForm);
