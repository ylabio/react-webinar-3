import {memo, useState} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import Input from "../../components/input";
import './style.css';

function LoginForm({handleFetchLogin, onChangeLogin, onChangePassword, errorMessage, t, loginValue, passwordValue}) {

  const cn = bem('LoginForm');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetchLogin();
  } 

  return (
    <form onSubmit={handleSubmit} className={cn()}>
      <h2 className={cn('title')}>{t('auth.title')}</h2>
        <div className={cn('container')}>
          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.login')}</label>
            <input className={cn('input')} type="text" onChange={e => onChangeLogin(e.target.value)} value={loginValue}/>
          </div>

          <div className={cn('item')}>
            <label className={cn('label')}>{t('auth.label.password')}</label>
            <input className={cn('input')} type="password" onChange={e => onChangePassword(e.target.value)} value={passwordValue}/>
          </div>
        </div>
        {
          errorMessage ? <span className={cn('error')}>{errorMessage}</span> : null
        }
        <input className={cn('btn')} type="submit" value={t('auth.submit')}/>
    </form>
  );
}

LoginForm.propTypes = {
  handleFetchLogin: PropTypes.func,
  onChangeLogin: PropTypes.func,
  onChangePassword: PropTypes.func,
  errorMessage: PropTypes.string
};

export default memo(LoginForm);
