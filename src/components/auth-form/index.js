import { memo, useCallback, useState } from 'react';
import useStore from '../../hooks/use-store';

import { authUser } from '../../services';
import useTranslate from '../../hooks/use-translate';

import Input from '../input';
import Button from '../button';

import './style.css';

function AuthForm() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMsq, setErrorMsq] = useState('');

  const { t } = useTranslate();

  const store = useStore();

  const callbacs = {
    updateUser: useCallback(() => store.actions.user.initParams(), [store]),
  };

  const onSubmit = async () => {
    const res = await authUser(login, password);
    if (res.error) {
      setIsError(true);
      setErrorMsq(res.error.data.issues[0].message);
    } else {
      setIsError(false);
    }
    callbacs.updateUser();
  };

  return (
    <div className="AuthForm">
      <h1 className="AuthForm-title">{t('user.authIn')}</h1>
      <form className={`AuthForm-form${isError ? ' error' : ''}`} action="">
        <label>
          <h4>{t('user.login')}</h4>
          <Input
            value={login}
            onChange={setLogin}
            placeholder={t('login.input')}
            delay={0}
            theme={'small'}
          />
        </label>
        <label className={`AuthForm-pass${isError ? ' error' : ''}`}>
          <h4>{t('user.pswd')}</h4>
          <Input
            value={password}
            onChange={setPassword}
            placeholder={t('pswd.input')}
            delay={0}
            theme={'small'}
          />
        </label>
        {isError && <div className="AuthForm-error">{errorMsq}</div>}
        <Button style="primary" title={t('login.btn')} onClick={onSubmit}></Button>
      </form>
    </div>
  );
}

export default memo(AuthForm);
