import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Login from '../../components/login';
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";

/**
 * Главная страница - первичная загрузка каталога
 */
function LoginPage() {

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.login.error,
    isAuth: state.login.isAuth,
    waiting: state.login.waiting,
  }));

  const callbacks = {
    // Авторизация
    getAuthorization: useCallback(body => store.actions.login.getAuthorization(body), [store]),
    // Выйти из аккаунта
    removeAuthorization: useCallback(body =>
      store.actions.login.removeAuthorization(body), [store]),
  }

  return (
    <PageLayout>
      <Head title={t('login')} enter={t('enter')} exit={t('exit')} isAuth={select.isAuth}
            removeAuthorization={callbacks.removeAuthorization}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <Login getAuthorization={callbacks.getAuthorization} error={select.error}
            isAuth={select.isAuth}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(LoginPage);
