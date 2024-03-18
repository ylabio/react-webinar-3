import React, { useEffect, memo } from 'react'
import Form from '../../components/form'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
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

  const options = {
    loginInputs: [
      {
        label: t('auth.login'),
        id: 'login',
        type: 'text',
        autoComplite: 'username',
        validationConfig: {
          required: 'Введите логин',
          minLength: {
            value: 2,
            message: 'Введите не менее 2 символов',
          },
          maxLength: {
            value: 30,
            message: 'Введите менее 30 символов',
          },
        },
      },
      {
        label: t('auth.password'),
        id: 'password',
        type: 'password',
        autoComplite: 'current-password',
        validationConfig: {
          required: 'Введите пароль',
        },
      },
    ],
  }

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
          inputs={options.loginInputs}
          sumbitAction={callbacks.onLogin}
          errorMessage={error}
        />
      </Spinner>
    </PageLayout>
  )
}

export default memo(Login)