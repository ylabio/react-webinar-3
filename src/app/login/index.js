import React, { useEffect, memo, useRef } from 'react'
import Form from '../../components/form'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner'
import AuthMenu from '../../containers/auth-menu';
import { useNavigate, useLocation } from 'react-router';
import useTranslate from '../../hooks/use-translate';

const Login = () => {

  const store = useStore();
  const navigate = useNavigate()
  const location = useLocation()
  const prevLocation = useRef(null);
  const {t} = useTranslate()

  console.log(location)

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
      const navigationPath = location.state?.prevPage || '/';
        navigate(navigationPath);
    }
  }, [isLoggedIn]);

  const options = {
    loginInputs: [
      {
        label: t('auth.login'),
        id: 'login',
        type: 'text',
        autoComplite: 'username',
        validationConfig: {
          required: true,
          minLength:2,
          maxLength: 30,
        },
      },
      {
        label: t('auth.password'),
        id: 'password',
        type: 'password',
        autoComplite: 'current-password',
        validationConfig: {
          required: true,
        },
      },
    ],
  }

  return (
    <PageLayout>
      <AuthMenu />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={pending}>
        <Form
          title={t('auth.signin')}
          buttonTitle={t('auth.signin-btn')}
          inputs={options.loginInputs}
          sumbitAction={callbacks.onLogin}
          errorMessage={error}
        />
      </Spinner>
    </PageLayout>
  )
}

export default memo(Login)