import { memo, useState, useCallback, useEffect, useMemo } from 'react';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import ProfileBar from '../../containers/profile-bar';
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';

const Login = () => {

  const {t} = useTranslate();
  const store = useStore();

  const errorMessage = useSelector(state => state.user.errorMessage);

  useEffect(() => {
    return () => {
      console.log('login page unmount');
      store.actions.user.clearErrorMessage()
    }
  }, []);
  
  const [form, setFormValue] = useState({
    email: '',
    password: ''
  });

  const callbacks = {
    onFormSubmit: useCallback((e) => {
      e.preventDefault();
      store.actions.user.login(form.email, form.password), [store]
    }),
    onFormChange: (e) => {
      e.preventDefault();
      setFormValue({...form, [e.target.name]: e.target.value });
    },
  }
  
  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} >
      <LocaleSelect />
    </Head>
    <Navigation />
    <LoginForm 
      onSubmit={callbacks.onFormSubmit} 
      onChange={callbacks.onFormChange} 
      errorMessage={errorMessage}
      labelLogin={t("login.login")}
      labelEmail={t("login.email")}
      labelPassword={t("login.password")}
      labelLoginButton={t("login.loginButton")}
    />
  </PageLayout>
  );
}

export default memo(Login);