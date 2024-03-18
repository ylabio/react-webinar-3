import React, { useEffect } from 'react'
import Form from '../../components/form'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import { loginInputs } from '../../constants/constants';
import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner'
import { useNavigate } from 'react-router';
import useTranslate from '../../hooks/use-translate';

const Login = () => {

  const store = useStore();
  const navigate = useNavigate()
  const {t} = useTranslate()

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
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={pending}>
        <Form
          title={t('auth.signin')}
          buttonTitle={t('auth.signin-btn')}
          inputs={loginInputs}
          sumbitAction={callbacks.onLogin}
          errorMessage={error}
          t={t}
        />
      </Spinner>
    </PageLayout>
  )
}

export default Login