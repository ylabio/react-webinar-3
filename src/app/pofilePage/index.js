import {memo, useCallback} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import Profile from '../../components/profile';
import Spinner from "../../components/spinner";

/**
 * Главная страница - первичная загрузка каталога
 */
function PofilePage() {

  const store = useStore();

  useInit(() => {
    store.actions.login.initParams();
  }, []);

  const {t} = useTranslate();

  const select = useSelector(state => ({
    error: state.login.error,
    isAuth: state.login.isAuth,
    user: state.login.user,
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
      <Head title={t('profile')} enter={t('enter')} exit={t('exit')} isAuth={select.isAuth}
            removeAuthorization={callbacks.removeAuthorization} user={select.user}
            link='/profile'>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <Profile user={select.user} isAuth={select.isAuth}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(PofilePage);
