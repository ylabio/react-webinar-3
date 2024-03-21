import {memo, useCallback, useMemo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ArticleCard from "../../components/article-card";
import LocaleSelect from "../../containers/locale-select";
import AuthBar from '../../components/auth-bar';
import LoginCard from "../../components/login-card";
import RedirectByLogin from '../../containers/redirect-by-login';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    user: state.auth.user,
    isLogged: state.auth.isLogged,
    waiting: state.auth.waiting,
    error: state.auth.error
  }))

  const callbacks = {
    login: ({user, pass}) => store.actions.auth.login({login: user, password: pass}),
    logout: useCallback(() => store.actions.auth.logout(), [store]),
    openLogin: useCallback(() => store.actions.auth.openLogin(), [store]),
  }

  return (
    <RedirectByLogin redirect='/profile' exec={select.isLogged} isLoggedNull={select.isLogged === null}>
        <PageLayout>
            <AuthBar t={t} logout={callbacks.logout} user={select.user} profileLink={'/profile'} loginLink={'/login'}/>
            <Head title={t('title')}>
                <LocaleSelect/>
            </Head>
            <Navigation/>
            <LoginCard t={t} login={callbacks.login} error={select.error} openLogin={callbacks.openLogin}/>
        </PageLayout>
    </RedirectByLogin>
  );
}

export default memo(Login);
