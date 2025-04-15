import React, {memo, useCallback, useEffect, useState} from 'react';
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useLocation, useNavigate} from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState('test_1');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const store = useStore();
  const location = useLocation();

  const select = useSelector(state => ({
    token: state.session.token,
    authError: state.session.error,
    loading: state.session.authWait,
  }));

  const callbacks = {
    onSubmit: useCallback(
      (email, password) => store.actions.session.login(email, password),
      [store, email, password],
    ),
    onClick: useCallback(() => {
      callbacks.onSubmit(email, password);
      setEmail('');
      setPassword('');
    }, [store, email, password]),
  };

  useEffect(() => {
    if (select.token) {
      navigate('/', { replace: true });
    }
  });

  useEffect(() => {
    store.actions.session.resetError()
  }, [location])

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
