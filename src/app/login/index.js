import {memo, useCallback, useMemo} from 'react';
import {useParams} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginBody from '../../components/login-body';
import Autorisation from '../../containers/autorisation';
import { useNavigate } from "react-router-dom";

/**
 * Страница логина
 */
function Login() {

  const store = useStore();

  const select = useSelector(state => ({
    error: state.user.amount,
  }));

  const callbacks = {
    // авторизация
    onLogin: useCallback((data) => store.actions.user.login(data), [store])
  }
  const navigate = useNavigate();
  function tryLogin(data){
    callbacks.onLogin(data).then((res)=>{
      if(res){
        navigate("/profile")
      }
    })
  }
  const {t} = useTranslate();
  const loginText={
    title:t('login.title'),
    login:t('login.login'),
    password:t('login.password'),
    button:t('login.button')
  }
  return (
    <PageLayout>
      <Autorisation/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <LoginBody onLogin={tryLogin} serverError={select.error} loginText={loginText}/>
    </PageLayout>
  );
}

export default memo(Login);
