import { memo } from 'react';
import './style.css'
import useSelector from '../../hooks/use-selector';
import { useState } from 'react';
import {cn as bem} from '@bem-react/classname'
import Input from '../input';

function LoginCard({t, buttonClick, error}) {
  const cn = bem('LoginCard');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const errorStyle = error? 'visible' : 'collapsed';

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const callbacks = {
    onClick: (e) => buttonClick(login, password),
  }

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <h2>{t('auth.login')}</h2>
      </div>
      <div className={cn('input')}>
        <div >{t('login.login')}</div>
        <input value={login} onChange={handleLoginChange}/>
      </div>
      <div className={cn('input')}>
        <div >{t('login.password')}</div>
        <input value={password} onChange={handlePasswordChange} type="password"/>
      </div>
      <div className={errorStyle}>
        {error}
      </div>
      <button onClick={callbacks.onClick}>{t('login.button')}</button>
    </div>
  );
}

export default memo(LoginCard);