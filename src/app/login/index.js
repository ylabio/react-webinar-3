import React, {memo, useCallback, useEffect, useState} from 'react';
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('test_1');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const store = useStore();

  const select = useSelector(state => ({
    isAuth: !!state.user.isAuth,
    authError: state.user.error,
    loading: state.user.authWait,
  }));

  const callbacks = {
    onSubmit: useCallback(
      (email, password) => store.actions.user.login(email, password),
      [store, email, password],
    ),
    onClick: useCallback(() => {
      callbacks.onSubmit(email, password);
      setEmail('');
      setPassword('');
      // select.isAuth && navigate('/');
    }, [store, email, password]),
  };

  useEffect(() => {
    if (select.isAuth) {
      console.log('123')
      navigate('/', { replace: true });
    }
  });

  return (
    <>
      <Head title={'Магазин'}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          errorMessage={select.authError}
          onSubmit={callbacks.onClick}
          loading={select.loading}
        />
      </PageLayout>
    </>
  );
};

export default memo(Login);
