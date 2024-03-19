import { memo } from "react";
import Input from "../input";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm(props) {

  const cn = bem('LoginForm')

  return (
    <div className={cn()}>
      <span className={cn('title')}>{props.t('login.entry')}</span>
      <div className={cn('input')}>
        <span>{props.t('form.login')}</span>
        <Input value={props.login} onChange={props.setLogin} />
      </div>
      <div className={cn('input')}>
        <span>{props.t('form.password')}</span>
        <Input value={props.password} onChange={props.setPassword} type='password' />
      </div>
      {!props.validation ? props.errorMessages.map((item) => <span key={item} className={cn('error')}>{item}</span>) : null}
      <button onClick={props.onClick}>{props.t('form.enter')}</button>
    </div>
  )
}

LoginForm.PropTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  validation: PropTypes.bool,
  errorMessages: PropTypes.array,
  setLogin: PropTypes.func,
  setPassword: PropTypes.func,
  onClick: PropTypes.func,
  t: PropTypes.func
}

LoginForm.defaultProps = {
  setLogin: () => {
  },
  setPassword: () => {
  },
  onClick: () => {
  },
  t: () => {
  },
  errorMessages: [],
}

export default memo(LoginForm);
