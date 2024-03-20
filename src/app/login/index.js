import React, {useCallback, useEffect} from 'react';
import PageLayout from "../../components/page-layout";
import UserPanel from "../../containers/user-panel";
import LocaleSelect from "../../containers/locale-select";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import {useNavigate} from "react-router-dom";
import useSelector from "../../hooks/use-selector";

const Login = () => {

  const store = useStore()
  const navigate = useNavigate()

  const select = useSelector(state => ({
    user: state.session.data.token,
    id: state.session.data.id,
    error: state.session.error
  }))

  const callbacks = {
    authorize: useCallback((login, pass) => store.actions.session.authorize(login, pass), [store])
  }

  useEffect(() => {
    if (select.user) {
      navigate(`/profile/${select.id}`)
    }
  }, [select.user])

  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserPanel />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm error={select.error} onClick={callbacks.authorize} t={t} />
    </PageLayout>
  );
};

export default React.memo(Login);
