import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [isSubmit, setIsSubmit] = useState(false);
  const navigateTo = useNavigate();

  const onSubmit = async ()=> {
    setIsSubmit(true);
    const res = await authUser(login.trim(), password.trim());
    if (res.error) {
      setErrorMsq(res.error.data.issues[0].message);
    } else {
      navigateTo(-1)
    }
    await onUpdate();
    setIsSubmit(false);
  };

  const disabledBtn = isSubmit || !(password.trim() && login.trim());

  const onShowPassword = e => {
    e.stopPropagation();
    const typeBtn = inputType === 'password' ? 'text' : 'password';

    setInputType(prev => typeBtn);
  };

  return (
    <div className="AuthForm">
      <h1 className="AuthForm-title">{t('user.authIn')}</h1>
      <form className={`AuthForm-form${!!errorMsq ? ' error' : ''}`} action="">
        <label>
          <h4>{t('user.login')}</h4>
          <Input
            value={login}
            onChange={setLogin}
            placeholder={t('login.input')}
            delay={100}
            theme={'small'}
          />
        </label>
        <label className={`AuthForm-pass${!!errorMsq ? ' error' : ''}`}>
          <h4>{t('user.pswd')}</h4>
          <Input
            value={password}
            onChange={setPassword}
            placeholder={t('pswd.input')}
            delay={100}
            theme={'small pswd'}
            type={inputType}
          />
          <button className="AuthForm-btn" onClick={onShowPassword} type="button">
            {inputType === 'password' ? <HidePassword /> : <ShowPassword />}
          </button>
        </label>
        {!!errorMsq && <div className="AuthForm-error">{errorMsq}</div>}
        <Button
          style="primary"
          title={t('login.btn')}
          onClick={onSubmit}
          disabled={disabledBtn}
        ></Button>
      </form>
    </div>
  );
}

export default memo(AuthForm);
