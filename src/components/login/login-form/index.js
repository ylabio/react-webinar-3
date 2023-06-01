import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import React from 'react';
import Input from '../../input';
import './style.css';

/**
 * Глупая форма для страницы логина.
 */

function LoginForm(props) {
  const cn = bem('LoginForm');

  return (
    <div className={cn()}>
      <div className={cn('title')}>{props.t('login.title')}</div>
      <div className={cn('field')}>{props.t('login.login')}</div>
      <Input type="text" onChange={value => props.onLoginChange(value)} value='' /> {/* value='' чтоб консоль баги не спамила */}
      <div className={cn('field')}>{props.t('login.password')}</div>
      <Input type="password" onChange={value => props.onPasswordChange(value)} value='' />
      {props.error ? <div className={cn('error')}>{props.error}</div> : null}
      <button className={cn('button')} onClick={props.onEnter}>{props.t('login.in')}</button>
    </div>
  );
};

LoginForm.propTypes = {
  onLoginChange: PropTypes.func,
  onPasswordChange: PropTypes.func,
  onEnter: PropTypes.func,
  error: PropTypes.string,
  t: PropTypes.func
}

LoginForm.defaultProps = {
  error: null,
  onLoginChange: () => { },
  onPasswordChange: () => { },
  onEnter: () => { },
  t: (text) => text
}

export default React.memo(LoginForm);