import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginHeader from '../../containers/login-header';
import LoginForm from '../../components/login-form';
import { useNavigate, useLocation } from 'react-router-dom'

/**
 * Страница входа
 */
function Login() {
  const store = useStore();
  const navigate = useNavigate()
  const location = useLocation()

  const select = useSelector(state => ({
    error: state.login.error,
    isLoggedIn: state.login.isLoggedIn
  }))
  
  useInit(() => {
    if(select.isLoggedIn && location.key === 'default') {
      navigate('/')
    } else if (select.isLoggedIn) {
      navigate(-1)
    }
  }, [select.isLoggedIn]);

  useEffect(() => {
    return () => {
      store.actions.login.resetError()
    }
  }, [])
  

  const {t} = useTranslate();

  const callbacks = {
    // Вход
    onSubmit: useCallback(formData => store.actions.login.signIn(formData), [store]),
  }

  const uiText = {
    title: t('login.title'),
    login: t('login.login'),
    password: t('login.password'),
    signin: t('login.signin')
  }

  return (
    <PageLayout>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm 
       onSubmit={callbacks.onSubmit}
       uiText={uiText} 
       error={select.error}
      />
    </PageLayout>
  );
}

export default memo(Login);
