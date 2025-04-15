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

  const handleInputChange = (value, name) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (auth.token && auth.user) {
      navigate('/profile');
    }
  }, [auth.token, auth.user, navigate]);

  useEffect(() => {
    store.actions.auth.clearError();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();

    const success = await store.actions.auth.login(form.login, form.password);

    if (success) {
      await store.actions.auth.fetchProfile();
      navigate('/profile');
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
              noDebounce={true}
              value={form.login}
              onChange={value => handleInputChange(value, 'login')}
              placeholder={t('login.loginPlaceholder') || 'Login'}
              theme="small"
            />
          </div>
          <div>
            <p>{t('login.password')}</p>
            <Input
              name="password"
              type="password"
              noDebounce={true}
              value={form.password}
              onChange={value => handleInputChange(value, 'password')}
              placeholder={t('login.passwordPlaceholder') || 'Password'}
              theme="small"
            />
          </div>
          <div>
            {auth.error?.issues?.length > 0 && (
              <div className="login-errors">
                {auth.error.issues.map((issue, i) => (
                  <div key={i} style={{ color: '#D43B3B' }}>
                    {issue.message}
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button
            type="submit"
            title={auth.loading ? t('login.loading') || 'Loading...' : t('login.button') || 'Войти'}
            style="primary"
            disabled={auth.loading}
          />
        </form>
      </PageLayout>
    </div>
  );
}

export default Login;
