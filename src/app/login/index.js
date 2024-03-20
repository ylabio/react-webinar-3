import { memo, useCallback, useEffect } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileTools from "../../containers/profile-tools";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginCard from "../../components/login-card";
import useSelector from "../../hooks/use-selector";


function Login() {
  const store = useStore();

  const select = useSelector(state => ({
    error: state.profile.error,
    token: state.profile.token,
    user: state.profile.user
  }))

  const { t } = useTranslate();

  const callbacks = {
    login: useCallback((login, password) => {
      store.actions.profile.login(login, password);
    }, [store]),
  }

  useEffect(() => {
    if(select.token){
      window.history.back();
    }
  })

  return (
    <PageLayout>
      <ProfileTools />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginCard t={t} buttonClick={callbacks.login} error={select.error} />
    </PageLayout>
  );
}

export default memo(Login);