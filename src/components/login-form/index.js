import { memo } from "react";
import Input from "../input";
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

export default memo(LoginForm);
