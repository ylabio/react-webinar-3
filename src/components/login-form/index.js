import {memo, useState} from "react";
import useTranslate from "../../hooks/use-translate";
import PropTypes from 'prop-types';
import Input from "../input";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function LoginForm({signIn, serverError}) {

   const cn = bem('Login-form');
   const [login, setLogin] = useState('');
   const [password, setPassword] = useState('');

   const loginHandler = (login) => {
      setLogin(login);
   }

   const passwordHandler = (password) => {
      setPassword(password);
   }

   const logPassHandler = () => {
      signIn(login, password);
   }

   const {t} = useTranslate();

   return (
      <div className={cn()}>
         <h2 className={cn('title')}>{t('login-form.enter')}</h2>
         <div className={cn('item')}>
            <div>{t('login-form.login')}</div>
            <Input  onChange={loginHandler} value={login} type='text' required/>
         </div>
         <div className={cn('item')}>
            <div>{t('login-form.password')}</div>
            <Input onChange={passwordHandler} value={password} type='password' required/>
         </div>
         { (serverError ? <div className={cn('error')}>{serverError}</div> : <div className={cn('bold')}></div>) }
         <button className={cn('button')} onClick={logPassHandler}>{t('login-form.button')}</button>
      </div>
   );
}

LoginForm.propTypes = {
   serverError: PropTypes.string,
   signIn: PropTypes.func
};

LoginForm.defaultProps = {
   signIn: () => {},
}

export default memo(LoginForm);