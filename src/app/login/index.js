import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import NavigationLogin from "../../containers/navigation-login";
import NavigationProfile from '../../containers/navigation-profile';

/**
 * Страница входа пользователя на сайт
 */
function Login() {
  const store = useStore();

  useInit(() => {
    store.actions.user.fResetError();
    store.actions.user.fGetDataUser(localStorage.getItem('token'));
  }, [store]);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <NavigationLogin/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <NavigationProfile/>
    </PageLayout>
  );
}

export default memo(Login);
