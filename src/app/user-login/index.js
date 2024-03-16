import React, { useState, memo, useCallback } from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import UserLoginView from '../../components/user-login-view';
import AuthPanel from '../../components/auth-panel';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";

const UserLogin = () => {  
  const [loginData, setLoginData] = useState({ login: '', password: '' });  
  
  const store = useStore();

  const select = useSelector(state => ({    
    waiting: state.auth.waiting,
    error: state.auth.error,
  }));  
  
  const {t} = useTranslate();  

  const callbacks = {
    onLogin: useCallback(e => {
      e.preventDefault();
      store.actions.auth.login(loginData);
    }, [store, loginData]),
    onChange: useCallback((name, value) => {
      setLoginData(prevState => ({...prevState, [name]: value}));
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
        loginData={loginData}
        onInputChange={callbacks.onChange}
        onLogin={callbacks.onLogin}
        error={select.error}
        loading={select.waiting} 
        t={t}
      />
    </PageLayout>    
  );
};

export default memo(UserLogin);
