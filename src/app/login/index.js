import { useState, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Input from '../../components/input';
import Button from '../../components/button';
import './style.css';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const auth = useSelector(s => s.auth);
  const { t } = useTranslate();

  const [form, setForm] = useState({ login: '', password: '' });

  const onChange = (value, name) => {
    setForm(f => ({ ...f, [name]: value }));
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate('/profile');
    }
  }, [auth.token, auth.user]);

  const onSubmit = async e => {
    e.preventDefault();

    await store.actions.auth.login(form.login, form.password);

    const token = store.getState().auth.token;
    if (token) {
      await store.actions.auth.fetchProfile();
    }

    const user = store.getState().auth.user;
    if (user) {
      navigate('/profile');
    } else {
      console.error('Профиль не загружен');
    }
  };

  return (
    <div>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <h2 className="login-head">{t('login.title')}</h2>
        <form className="login-from" onSubmit={onSubmit}>
          <div>
            <p>{t('login.login')}</p>
            <Input
              name="login"
              value={form.login}
              onChange={onChange}
              placeholder={t('login.loginPlaceholder') || 'Login'}
              theme="small"
            />
          </div>
          <div>
            <p>{t('login.password')}</p>
            <Input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder={t('login.passwordPlaceholder') || 'Password'}
              theme="small"
            />
          </div>
          <div>{auth.error && <div style={{ color: 'red' }}>{auth.error}</div>}</div>
          <Button type="submit" title={t('login.button') || 'Войти'} style="primary" />
        </form>
      </PageLayout>
    </div>
  );
}

export default Login;
