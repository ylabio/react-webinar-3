import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import React, {memo} from 'react';
import Input from '../input';
import './style.css';

function FormLogin(props) {
  const cn = bem('FormLogin');

  return (
    <form className={cn()} onSubmit={props.onSubmit}>
      <div className={cn('title')}>{props.t('login.title')}</div>
      <div className={cn('label')}>{props.t('login.login')}</div>
      <Input type="text" onChange={value => props.onUsernameChange(value)} value='' />
      <div className={cn('label')}>{props.t('login.password')}</div>
      <Input type="password" onChange={value => props.onPasswordChange(value)} value='' />
      {props.error && <div className={cn('error')}>{props.error}</div>}
      <button className={cn('submit')}>{props.t('login.enter')}</button>
    </form>
  );
};

FormLogin.propTypes = {
  onUsernameChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.string,
  t: PropTypes.func
}

FormLogin.defaultProps = {
  error: null,
  onUsernameChange: () => { },
  onPasswordChange: () => { },
  onSubmit: () => { },
  t: (text) => text
}

export default memo(FormLogin);