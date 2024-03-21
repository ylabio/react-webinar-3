import {memo, useCallback, useMemo, useEffect} from 'react';
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
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../components/profile-card';
import RedirectByLogin from '../../containers/redirect-by-login';

/**
 * Страница авторизации
 */
function Profile() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    isLogged: state.auth.isLogged,
    user: state.auth.user,
    waiting: state.auth.waiting,
    profile: state.profile.user,
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  useEffect(() => {
    select.user?._id && store.actions.profile.getProfile(select.user._id)
  }, [select.user?._id]);

  return (
    <RedirectByLogin redirect='/login' exec={!select.isLogged} isLoggedNull={select.isLogged === null}>
        <PageLayout>
            <AuthBar t={t} logout={callbacks.logout} user={select.user} profileLink={'/profile'} loginLink={'/login'}/>
            <Head title={t('title')}>
                <LocaleSelect/>
            </Head>
            <Navigation/>
            {select.profile ? <ProfileCard t={t} user={select.profile}/> : null}
        </PageLayout>
    </RedirectByLogin>
  );
}

export default memo(Profile);
