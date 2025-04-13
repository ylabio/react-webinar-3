import { memo, useState } from 'react';

import { authUser } from '../../api';

import Input from '../input';
import Button from '../button';

import HidePassword from '../../assets/icon/hide.svg';
import ShowPassword from '../../assets/icon/show.svg';

import './style.css';

function AuthForm({ t = text => text, onUpdate = () => {} }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsq, setErrorMsq] = useState('');
  const [inputType, setInputType] = useState('password');

  const onSubmit = async () => {
    const res = await authUser(login, password);
    if (res.error) {
      setErrorMsq(res.error.data.issues[0].message);
    } else {
      setErrorMsq(prev => '');
    }
    await onUpdate();
  };

  const disa = !(password.trim().length && login.trim().length);
  const onShowPassword = e => {
    e.stopPropagation();
    const typeBtn = inputType === 'password' ? 'text' : 'password';

    setInputType(prev => typeBtn);
  };
  console.log(disa);
  return (
    <div className="AuthForm">
      <h1 className="AuthForm-title">{t('user.authIn')}</h1>
      <form className={`AuthForm-form${!!errorMsq ? ' error' : ''}`} action="">
        <label>
          <h4>{t('user.login')}</h4>
          <Input
            value={login.trim()}
            onChange={setLogin}
            placeholder={t('login.input')}
            delay={400}
            theme={'small'}
          />
        </label>
        <label className={`AuthForm-pass${!!errorMsq ? ' error' : ''}`}>
          <h4>{t('user.pswd')}</h4>
          <Input
            value={password.trim()}
            onChange={setPassword}
            placeholder={t('pswd.input')}
            delay={400}
            theme={'small pswd'}
            type={inputType}
          />
          <button className="AuthForm-btn" onClick={onShowPassword} type="button">
            {inputType === 'password' ?  <HidePassword /> : <ShowPassword />}
          </button>
        </label>
        {!!errorMsq && <div className="AuthForm-error">{errorMsq}</div>}
        <Button style="primary" title={t('login.btn')} onClick={onSubmit} disabled={disa}></Button>
      </form>
    </div>
  );
}

export default memo(AuthForm);
