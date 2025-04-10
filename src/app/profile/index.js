import { memo } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileCard from '../../components/profile-card';
import AuthNavigation from '../../containers/auth-navigation';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

/**
 * Страница профиля
 */
function Profile() {
  const select = useSelector(state => ({
    user: state.auth.user,
    auth: state.auth.auth,
    loading: state.auth.loading,
  }));

  const { t } = useTranslate();

  return (
    <>
      <AuthNavigation />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileCard user={select.user} t={t} />
      </PageLayout>
    </>
  );
}

export default memo(Profile);
