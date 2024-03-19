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
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.user.initParams();
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

export default memo(Profile);
