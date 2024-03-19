import React, {useCallback, useEffect, useState} from "react";
import PageLayout from "../../components/page-layout";
import AuthHead from "../../containers/auth-head";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import FlexContainer from "../../components/flex-container";
import FormLayout from "../../components/form-layout";
import FormInput from "../../components/form-input";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import Spinner from "../../components/spinner";

function Login() {

  const {t} = useTranslate();

  const navigate = useNavigate()
  const store = useStore();

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const select = useSelector(state => ({
    error: state.auth.error,
    waiting: state.auth.waiting,
    isAuth: state.auth.isAuth,
  }));

  const referrer = new URLSearchParams(location.search).get("referrer");

  const callbacks = {
    logIn: useCallback(() => store.actions.auth.logIn(login, password), [login, password]),
    logOut: useCallback(() => store.actions.auth.logOut(), [store]),
    resetAuth: useCallback(() => store.actions.auth.resetAuth(), [store]),
  }

  const options = {
    values: [
      {
        label: t('label.login'),
        name: 'login',
        onChange: setLogin,
        type: 'text',
        value: login
      },
      {
        label: t('label.password'),
        name: 'password',
        onChange: setPassword,
        type: 'password',
        value: password
      }
    ]
  }

  const renders = {
    values: options.values.map((item) => (
      <FormInput key={item.name} item={item}/>
    ))
  }

  const links = {
    profile: '/profile'
  }

  useEffect(() => {
    if (select.isAuth) {
      navigate(referrer || links.profile); // Редирект на предыдущую страницу или на профиль по умолчанию
    }
  }, [select.isAuth, referrer, navigate]);

  useEffect(() => {
    callbacks.resetAuth()
  }, []);

  return (
    <PageLayout>
      <AuthHead/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <FlexContainer title={t('login')}>
          <FormLayout btnLabel={t('signIn')} error={select.error} onSubmit={callbacks.logIn}>
            {renders.values}
          </FormLayout>
        </FlexContainer>
      </Spinner>
    </PageLayout>
  )
}

export default React.memo(Login);