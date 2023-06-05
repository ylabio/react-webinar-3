import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Input from "../input";

function Form(props) {
  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    const [login, password] = e.target;
    props.login(login.value, password.value);
  }

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{props.title}</h2>

      <form className={cn('form')} onSubmit={handleSubmit}>
        <label>{props.loginText}</label>
        <Input className={cn('input')} type="text" name='login' theme="login" value='' />
        <label>{props.password}</label>
        <Input className={cn('input')} type="password" name='password' theme="login" value='' />
        {props.error &&
          <span className={cn('form', { error: true })}>{props.error}</span>}
        <button type="submit">{props.buttonName}</button>

      </form>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  loginText: PropTypes.string,
  password: PropTypes.string,
  buttonName: PropTypes.string,
  login: PropTypes.func.isRequired,
  error: PropTypes.string
};

Form.defaultProps = {
  login: () => { },
}

export default memo(Form);
