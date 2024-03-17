import {memo, useCallback, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import { useNavigate } from 'react-router-dom';
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
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    message: state.profile.message
  }));

  useEffect(
    () => {
      if (select.user) {
        navigate('/profile/');
      }
    },
    [select.user]
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
      <Spinner active={select.waiting}>
        <LoginForm
          t={t}
          onClickLogin={callbacks.login}
          waiting={select.waiting}
          message={select.message}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Login);
