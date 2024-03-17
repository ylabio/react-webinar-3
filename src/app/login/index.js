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

function Login() {
  const navigate = useNavigate()
  const {t} = useTranslate();
  const store = useStore();
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');

  const select = useSelector(state => ({
    isLogin: state.login.isLogin,
    isValid: state.login.isValid,
    article: state.article.data,
    errorMessage: state.login.errorMessage,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    onLogin: useCallback(() => store.actions.login.login(loginName, password), [store]),
    onLogout: useCallback(() => store.actions.login.logout(), [store]),
  }

  const handleOnclick =()=>{
    navigate('/login');
  }

  useEffect(() => {
    if (select.isLogin) {
     return navigate('/profile')
   }
  }, [select.isLogin])

  return (
    <PageLayout>
      <LoginNav title={t('login.enter')} onClick={handleOnclick}/>
      {/* <Head title={select.article.title}> */}
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>

      <LoginForm isValid={select.isValid} onClick={callbacks.onLogin}
         t={t} setLoginName={setLoginName} loginName={loginName} setPassword={setPassword}
         password={password} error={select.errorMessage}/>

    </PageLayout>
  );
}

export default memo(Login);