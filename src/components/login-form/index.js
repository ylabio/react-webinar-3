import { memo } from "react";
import Input from "../input";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function LoginForm(props) {

  return (
    <div className='LoginForm'>
      <span className='LoginForm-title'>{props.t('login.entry')}</span>
      <div className='LoginForm-input'>
        <span>{props.t('form.login')}</span>
        <Input value={props.login} onChange={props.setLogin} />
      </div>
      <div className='LoginForm-input'>
        <span>{props.t('form.password')}</span>
        <Input value={props.password} onChange={props.setPassword} />
      </div>
      {!props.validation ? <span className='LoginForm-error'>{props.errorMessage}</span> : null}
      <button onClick={props.onClick}>{props.t('form.enter')}</button>
    </div>
  )
}

LoginForm.PropTypes = {
  login: PropTypes.string,
  password: PropTypes.string,
  validation: PropTypes.bool,
  errorMessage: PropTypes.string,
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
}

export default memo(LoginForm);
