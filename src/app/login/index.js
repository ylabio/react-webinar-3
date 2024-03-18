import { memo, useCallback } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileTools from "../../containers/profile-tools";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginCard from "../../components/login-card";
import useSelector from "../../hooks/use-selector";
import { redirect, useNavigate } from "react-router-dom";


function Login() {
  const store = useStore();
  const select = useSelector(state => ({
    error: state.profile.error,
    token: state.profile.token
  }))
  const {t} = useTranslate();

  const callbacks = {
    login: useCallback((login, password) => store.actions.profile.login(login, password), [store]),
  }
  if(select.token){

  }
  return (
    <PageLayout>
      <ProfileTools/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      {select.token ? <h1>Вход успешно выполнен</h1> : <LoginCard t={t} buttonClick={callbacks.login} error={select.error}/>}
      {/* <LoginCard t={t} buttonClick={callbacks.login} error={select.error}/> */}
    </PageLayout>
  );
}

export default memo(Login);