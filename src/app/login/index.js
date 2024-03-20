import React, {memo, useCallback, useEffect, useState} from 'react'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import FormAuthorization from "../../components/form-authorization";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {redirect, useNavigate} from "react-router-dom";
import TopMenu from "../../containers/top-menu";
import useInit from "../../hooks/use-init";

const Login = () => {

  const store = useStore();
  const navigate = useNavigate();
  const {t} = useTranslate();

  const [userData, setUserData] = useState({login: '', password: ''})

  const select = useSelector(state => ({
    params:  state.catalog.params,
    token:  state.authorization.token,
    waiting: state.authorization.waiting,
    error: state.authorization.error,
    profile: state.profile.user,
  }));

  const callbacks = {
    onSign: useCallback((e) => {
      e.preventDefault();
      store.actions.authorization.sign(userData);
    }, [store, userData]),
    onChange: useCallback((name, value) => {
      setUserData(prevState => ({...prevState, [name]: value}));
    }, [store]),
  }

  const redirectPforile = () => {
    if (select.token) {
      return navigate(-1);
    }
    return null;
  };

  useInit(() => {
    redirectPforile()
  }, [select.token], true)

  return (
    <PageLayout>
      <TopMenu />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <FormAuthorization
        onChangeInput={callbacks.onChange}
        onSign={callbacks.onSign}
        error={select.error}
        userData={userData}
      />
    </PageLayout>
  )
}
export default memo(Login);
