import { memo, useMemo } from 'react';

import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';
import ProfileInfo from '../../components/profile-info';

import AuthBar from '../../components/auth-bar';
import useAuth from '../../hooks/use-auth';

/**
 * Страница профиля
 */

function Profile() {
  const { t } = useTranslate();

  const { isAuth, loading, profileData } = useSelector(state => ({
    isAuth: state.user.isAuth,
    loading: state.profile.loading,
    profileData: state.profile.data || state.user.user,
  }));

  useAuth();

  if (!isAuth) return null;

  return (
    <>
      <Head TopBar={<AuthBar />} title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        {loading ? <div>Загрузка...</div> : <ProfileInfo user={profileData} t={t} />}
      </PageLayout>
    </>
  );
}

export default memo(Profile);
