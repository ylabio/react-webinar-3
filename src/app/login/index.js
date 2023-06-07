import {memo, useCallback, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import SideLayout from "../../components/side-layout";
import LoginForm from "../../components/login-form";

function Login() {
  const navigate = useNavigate()
  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.error,
    token: state.user.token
  }));

  const {t} = useTranslate();

  const callbacks = {
    // Авторизация
    onLogin: useCallback((form) => store.actions.user.login(form), [store]),
  }

  useEffect(() => {
    if(select.token) {
      navigate('/profile')
      return
    }
  },[select.token])

  return (
    <PageLayout>
      <SideLayout side={'end'} padding={'small-medium'}>
        <button onClick={() => navigate('/login')}>Вход</button>
      </SideLayout>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginForm onSubmit={callbacks.onLogin} error={select.error}/>
    </PageLayout>
  );
}

export default memo(Login);
