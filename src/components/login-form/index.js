import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function LoginForm(props) {
  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.callbacks.onLogin({
      login: props.username,
      password: props.password
    });
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <h2>{props.t('login.log-in')}</h2>
      <div className={cn('field')}>
        <label htmlFor="login">{props.t('login.login')}</label>
        <input id="login" type="text" value={props.username} onChange={props.callbacks.onChangeUserName} />
      </div>
      <div className={cn('field')}>
        <label htmlFor="password">{props.t('login.password')}</label>
        <input id="password" type="password" value={props.password} onChange={props.callbacks.onChangePassword} />
      </div>
      {props.error &&
        <div className={cn('error')}>
          <label>{props.error.message}</label>
        </div>
      }
      <div className={cn('field')}>
        <button type="submit">{props.t('login.sign-in')}</button>
      </div>
    </form>
  );
}

export default memo(LoginForm);
