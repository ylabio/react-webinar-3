import React, { useEffect } from 'react'
import Form from '../../components/form'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import { loginInputs } from '../../utills/constants';
import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner'
import { useNavigate } from 'react-router';

const Login = () => {

  const store = useStore();
  const navigate = useNavigate()

  const {pending, isLoggedIn, error} = useSelector(state => ({
    pending: state.auth.pending,
    isLoggedIn: state.auth.isLoggedIn,
    error: state.auth.error
  }))

  const callbacks = {
      onLogin: useCallback(formData => {
        store.actions.auth.signIn(formData);
      }, []),
    };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }

  },[isLoggedIn])

  return (
    <PageLayout>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={pending}>
        <Form
          title={'Вход'}
          buttonTitle={'Войти'}
          inputs={loginInputs}
          sumbitAction={callbacks.onLogin}
          errorMessage={error}
        />
      </Spinner>
    </PageLayout>
  )
}

export default Login