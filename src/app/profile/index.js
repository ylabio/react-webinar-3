import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileCard from '../../components/profile-card';
import Spinner from '../../components/spinner';
import AuthNavigation from '../../containers/auth-navigation';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();
  const select = useSelector(state => ({
    user: state.user.data,
    isLoading: state.user.isLoading,
  }));

  useInit(
    () => {
      store.actions.user.getUserById();
    },
    [],
    true,
  );

  const { t } = useTranslate();

  return (
    <>
      <AuthNavigation />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.isLoading}>
          <ProfileCard user={select.user} t={t} />
        </Spinner>
      </PageLayout>
    </>
  );
}

export default memo(Profile);
