import { memo, useCallback, useEffect, useState } from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileTools from "../../containers/profile-tools";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import LoginCard from "../../components/login-card";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";


function Login() {
  const store = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const select = useSelector(state => ({
    token: state.session.token,
    user: state.profile.data,
    waiting: state.session.waiting,
  }))

  const { t } = useTranslate();

  const callbacks = {
    login: useCallback(async(login, password) => {
       const error = await store.actions.session.logIn(login, password);
       setError(error);
       if(!error && !select.waiting){
        navigate('/profile');
       }
    }, [store]),
  }

  useEffect(() => {
    if(select.token){
      navigate('/profile');
    }
  }, [select.token])

  return (
    <PageLayout>
      <ProfileTools />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginCard t={t} buttonClick={callbacks.login} error={error} />
    </PageLayout>
  );
}

export default memo(Login);