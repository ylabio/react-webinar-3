import { memo, useCallback, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import UserPanel from '../../containers/user-panel';
import LoginForm from '../../components/login-form';
import LabeledInput from '../../components/label-input';

import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [credentials, setCredentials] = useState({ login: '', password: '' });

  const select = useSelector((state) => ({
    error: state.user.error,
    waiting: state.user.waiting,
    isAuth: state.user.isAuth,
  }));

  const callbacks = {
    onFieldChange: (value, name) => {
      setCredentials((prev) => ({ ...prev, [name]: value }));
    },
    onSubmit: useCallback(
      async (evt) => {
        evt.preventDefault();
        await store.actions.user.login(credentials);
        if (select.isAuth) {
          navigate(state?.from ?? '/');
        }
      },
      [credentials, store]
    ),
  };

  useEffect(() => {
    setCredentials({ login: '', password: '' });
  }, []);

  useEffect(() => {
    if (select.isAuth) {
      navigate(state?.from ?? '/');
    }
  }, [select.isAuth]);

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />

      <LoginForm
        error={select.error}
        waiting={select.waiting}
        isAuth={select.isAuth}
        onSubmit={callbacks.onSubmit}
      >
        <LabeledInput
          name={t('field.login')}
          id={'login'}
          onChange={callbacks.onFieldChange}
          value={credentials.login}
        />
        <LabeledInput
          name={t('field.password')}
          id={'password'}
          type={'password'}
          value={credentials.password}
          onChange={callbacks.onFieldChange}
        />
      </LoginForm>
    </PageLayout>
  );
}

export default memo(Login);
