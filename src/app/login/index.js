import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useProfile from '../../hooks/use-profile';
import useTranslate from "../../hooks/use-translate";
import { useNavigate, useLocation } from 'react-router-dom';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileBar from '../../containers/profile-bar';
import LoginForm from '../../components/login-form';
import Spinner from "../../components/spinner";

/**
 * Страница авторизации
 */
function Login() {

  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = useProfile();
  const {t} = useTranslate();

  useEffect(
    () => {
      if (profile.data) {
        if (location.state && location.state.isNotStartPage) {
          navigate(-1, {replace: true});
        } else {
          navigate('/profile/');
        }
      }
    },
    [profile.data]
  );

  const callbacks = {
    // Авторизация
    login: useCallback((login, password) => store.actions.profile.login(login, password), [store]),
  }

  return (
    <PageLayout>
      <ProfileBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={profile.waiting}>
        <LoginForm
          t={t}
          onClickLogin={callbacks.login}
          waiting={profile.waiting}
          message={profile.message}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
