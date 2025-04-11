import { memo, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import AuthInput from '../../components/auth-input';
import Button from '../../components/button';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';

function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslate();

  const [form, setForm] = useState({
    login: '',
    password: ''
  });

  const select = useSelector(state => ({
    loginError: state.user.loginError
  }));

  const callbacks = {
    onChangeField: useCallback((name, value) => {
      setForm(prev => ({...prev, [name]: value}));
    }, []),
    
    onSubmit: useCallback(async (e) => {
      e.preventDefault();
      
      if (!form.login.trim() || !form.password.trim()) {
        store.actions.user.setState({
          ...store.actions.user.getState(),
          loginError: 'Заполните все поля'
        });
        return;
      }
      
      const success = await store.actions.user.login(form.login, form.password);
      if (success) {
        navigate(location.state?.from || '/');
      }
    }, [form.login, form.password, store, navigate, location]),
  };

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <div style={{ maxWidth: '400px' }}>
          <h2>{t('auth.login')}</h2>
          <form onSubmit={callbacks.onSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <AuthInput 
                value={form.login}
                onChange={(value) => callbacks.onChangeField('login', value)}
                placeholder={t('auth.loginPlaceholder')}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <AuthInput 
                value={form.password}
                onChange={(value) => callbacks.onChangeField('password', value)}
                type="password"
                placeholder={t('auth.passwordPlaceholder')}
              />
            </div>
            <Button 
              type="submit" 
              title={t('auth.loginButton')} 
              style="primary"
            />
          </form>
          {select.loginError && (
            <div style={{ color: 'red', marginTop: '1rem' }}>
              {select.loginError}
            </div>
          )}
        </div>
      </PageLayout>
    </>
  );
}

export default memo(Login);