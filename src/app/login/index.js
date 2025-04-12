import { memo, useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Input from '../../components/input';
import Button from '../../components/button';
import Spinner from '../../components/spinner';
import Navigation from '../../containers/navigation';
import './style.css';
import LoginButton from '../../components/login-button';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => ({
    waiting: state.login.waiting,
    error: state.login.error,
    token: state.login.token,
  }));

  useEffect(() => {
    if (select.token) {
      navigate('/profile');
    }
  }, [select.token, navigate]);

  const callbacks = {
    onSubmit: useCallback(
      async e => {
        e.preventDefault();
        const success = await store.actions.login.login({ login, password });
        if (success) {
          navigate('/profile');
        }
      },
      [login, password, store.actions.login, navigate],
    ),

    // Обновление полей
    onLoginChange: useCallback(value => setLogin(value), []),
    onPasswordChange: useCallback(value => setPassword(value), []),
  };

  return (
    <>
      <LoginButton />
      <Head title={t('login.title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <form className="LoginForm" onSubmit={callbacks.onSubmit}>
            <h2>{t('login.formTitle')}</h2>
            <div className="LoginForm-field">
              <label htmlFor="login">{t('login.loginLabel')}</label>
              <Input
                id="login"
                type="text"
                value={login}
                onChange={callbacks.onLoginChange}
                placeholder={t('login.loginPlaceholder')}
              />
            </div>
            <div className="LoginForm-field">
              <label htmlFor="password">{t('login.passwordLabel')}</label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={callbacks.onPasswordChange}
                placeholder={t('login.passwordPlaceholder')}
              />
            </div>
            {select.error && <div className="LoginForm-error">{select.error}</div>}
            <div className="LoginForm-actions">
              <Button type="submit" title={t('login.submitButton')} />
            </div>
          </form>
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Login);
