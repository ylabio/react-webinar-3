import { memo, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import LoginForm from '../../components/login-form';

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
      store.actions.user.setState({
        ...store.actions.user.getState(),
        loginError: ''
      });
      setForm(prev => ({...prev, [name]: value}));
    }, [store]),
    
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
        <LoginForm 
          login={form.login}
          password={form.password}
          error={select.loginError}
          onChangeField={callbacks.onChangeField}
          onSubmit={callbacks.onSubmit}
          t={t}
        />
      </PageLayout>
    </>
  );
}

export default memo(Login);