import {memo,useState,useCallback} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function FormLogin({item, error, onLogin, t}) {
  const cn = bem('FormLogin');

   const [login, setLogin] = useState(item.login);
   const [password, setPassword] = useState(item.password);
   const [profile, setProfile] = useState(false);

   const onLoginInput = (event) => {
    setLogin(event.target.value);
   };

   const onPasswordInput = (event) => {
    setPassword(event.target.value);
   };

   const onLoginButton = () => {
    let vResult = onLogin(login,password);
    if (vResult == 1) {
      setProfile(true);
    }
   };

   const fError = (error) => {
      if(error == 1) {
        return t('formLogin.errorNoLogin');
      }
      if(error == 2) {
        return t('formLogin.errorNoPassword');
      }
      if(error == 3) {
        return t('formLogin.error400');
      }
      if(error == 4) {
        return t('formLogin.errorServer');
      }
      if (error == 5) {
        return t('formLogin.error5');
      }
      return '';
   }

  return (
    <div className={cn()}>
      <div className={cn('entrance')}>{t('menuSite.login')}</div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('formLogin.login')}</div>
        <div className={cn('label')}>
        <input
          value={login}
          className={cn('input')}
          onChange={onLoginInput}
        />
        </div>
      </div>
      <div className={cn('prop')}>
        <div className={cn('label')}>{t('formLogin.password')}</div>
        <div className={cn('label')}>
        <input
          value={password}
          type='password'
          className={cn('input')}
          onChange={onPasswordInput}
        />
        </div>
      </div>
      {(error != 0 ?
      <div className={cn('error')}>
        {fError(error)}
      </div>
      : ''
      )}
      <div className={cn('LoginButton')}>
        <button  onClick={() => onLoginButton()}>{t('formLogin.enter')}</button>
      </div>
      {profile && (
          <Navigate to={item.link} replace={true} />
      )}
    </div>
  );
}

FormLogin.propTypes = {
  item: PropTypes.shape ({
    key: PropTypes.number,
    link: PropTypes.string,
    login: PropTypes.string,
    password: PropTypes.string,
  }),
  error: PropTypes.number,
  onLogin: PropTypes.func,
  t: PropTypes.func
};

FormLogin.defaultProps = {
  error: 0,
  onLogin: () => {},
  t: (text) => text
}

export default memo(FormLogin);
