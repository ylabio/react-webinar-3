import {memo, useCallback, useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LoginForm from "../../components/login-form";
import LocaleSelect from "../../containers/locale-select";
import LoginNav from '../../components/login-nav';
import useInit from "../../hooks/use-init";

function Login() {
  const navigate = useNavigate()
  const {t} = useTranslate();
  const store = useStore();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
    errorMessage: state.login.errorMessage,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogin: useCallback((loginName, password) => store.actions.login.loginByEmail(loginName, password), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
    onСlearErrorMessage : useCallback(() => store.actions.login.clearErrorMessage(), [store]),
  }

  const handleOnLogin=(e)=>{
    e.preventDefault();
    callbacks.onLogin(loginName, password);
  }

  const handleOnclick =()=>{
    navigate('/login');
  }

  useInit(() => {
    callbacks.onСlearErrorMessage();
    if(select.isLogin === true) store.actions.login.loginByToken();
  }, [], true);

  useEffect(() => {
    if (select.isLogin === true) {
     return navigate('/profile')
   }
  }, [select.isLogin])

  return (
    <PageLayout>
      <LoginNav onClick={handleOnclick}/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>

      <LoginForm isValid={select.isValid} onClick={handleOnLogin}
         t={t} setLoginName={setLoginName} loginName={loginName} setPassword={setPassword}
         password={password} error={select.errorMessage}/>

    </PageLayout>
  );
}

export default memo(Login);