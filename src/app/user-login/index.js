import React, { useEffect, memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import UserLoginForm from '../../components/user-login-form';
import AuthHeader from '../../containers/auth-header';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";

const UserLogin = () => { 
  const store = useStore();

  const select = useSelector(state => ({    
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));  

  const {t} = useTranslate();  

  useEffect(() => {
    return () => {
      store.actions.auth.clearError();
    };
  }, [store]);

  const callbacks = {
    onLogin: useCallback((loginData) => {
      store.actions.auth.login(loginData);
    }, [store]),
  }  

  return (
    <PageLayout>  
      <AuthHeader />      
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserLoginForm
        onLogin={callbacks.onLogin}
        error={select.error}
        loading={select.waiting} 
        t={t}
      />
    </PageLayout>    
  );
};

export default memo(UserLogin);