import React, { memo, useState, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import UserLoginView from '../../components/user-login-view';
import AuthPanel from '../../containers/auth-panel';
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

  const callbacks = {
    onLogin: useCallback((loginData) => {
      store.actions.auth.login(loginData);
    }, [store]),
  }

  return (
    <PageLayout>  
      <AuthPanel />      
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserLoginView
        onLogin={callbacks.onLogin}
        error={select.error}
        loading={select.waiting} 
        t={t}
      />
    </PageLayout>    
  );
};

export default memo(UserLogin);
