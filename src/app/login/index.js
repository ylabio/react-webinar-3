import { memo, useCallback, useEffect, useState } from "react"
import HeadProfile from "../../components/head-profile"
import Head from "../../components/head"
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from "../../components/login-form";
import PageAccess from "../../containers/page-access";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";

function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const store = useStore();

  useInit(() => {
    store.actions.login.initParams();
  }, [], true);

  const select = useSelector(state => ({
    token: state.login.token,
    validation: state.login.validation,
    errorMessages: state.login.errorMessages,
    redirect: state.article.redirect,
    id: state.article.data._id
  }));

  const callbacks = {
    //Авторизация
    onLogIn: useCallback(() => store.actions.login.logIn({data: {login: login, password: password}}), [login, password]),
  }

  const {t} = useTranslate();

  return (
    <PageAccess redirect={select.redirect ? `/articles/${select.id}`: '/profile'} needAuthorization={false}>
      <PageLayout>
        <HeadProfile title={t('login.entry')} link={'/login'}/>
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <Navigation />
        <LoginForm t={t} onClick={callbacks.onLogIn}
          login={login} setLogin={setLogin}
          password={password} setPassword={setPassword}
          validation={select.validation} errorMessages={select.errorMessages}>
        </LoginForm>
      </PageLayout>
    </PageAccess>
  )
}

export default memo(Login);
