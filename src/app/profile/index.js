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
import { Navigate } from 'react-router-dom';
import ProfileCard from '../../components/profile-card';

/**
 * Страница авторизации
 */
function Login() {
  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector((state) => ({
    user: state.auth.user,
  }))

  const callbacks = {
    logout: useCallback(() => store.actions.auth.logout(), [store]),
  }

  return (
    <>
        {select.user ?
            <PageLayout>
                <AuthBar t={t} logout={callbacks.logout} user={select.user}/>
                <Head title={t('title')}>
                    <LocaleSelect/>
                </Head>
                <Navigation/>
                <ProfileCard t={t} user={select.user}/>
            </PageLayout>
        : <Navigate to="/login" />}
    </>
  );
}

export default memo(Login);
