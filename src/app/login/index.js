import { memo, useCallback, useEffect, useState } from "react"
import HeadProfile from "../../components/head-profile"
import Head from "../../components/head"
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  const store = useStore();

  const select = useSelector(state => ({
    token: state.login.token,
    validation: state.login.validation,
    errorMessage: state.login.errorMessage,
    authorized: state.login.authorized
  }));

  useEffect(() => {
    if (select.authorized) {
     return navigate('/profile')
   }
  }, [select.authorized])

  const callbacks = {
    //Авторизация
    onLogIn: useCallback(() => store.actions.login.logIn({data: {login: login, password: password}}), [login, password]),
  }

  const {t} = useTranslate();

  return (
    <PageLayout>
      <HeadProfile title={t('login.entry')} link={'/login'} />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t} onClick={callbacks.onLogIn}
        login={login} setLogin={setLogin}
        password={password} setPassword={setPassword}
        validation={select.validation} errorMessage={select.errorMessage}>
      </LoginForm>
    </PageLayout>
  )
}

export default memo(Login);
