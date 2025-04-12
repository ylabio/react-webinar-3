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
import useStore from '../../hooks/use-store';

/**
 * Страница профиля
 */
import { useEffect } from 'react';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  const { token } = useSelector(state => state.user);
const memoizedToken = useMemo(() => token, [token]);
  
  const { isAuth, loading, profileData } = useSelector(state => ({
    isAuth: state.user.isAuth,
    loading: state.profile.loading,
    profileData: state.profile.data || state.user.user
  }));
  

  useAuth();

  useEffect(() => {
    if (isAuth && token) {
      store.actions.profile.loadProfile(token);
    }
  }, [ memoizedToken]);

  if (!isAuth) return null;

  return (
    <>
      <Head TopBar={<AuthBar />} title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        {loading ? (
          <div>Загрузка...</div>
        ) : (
          <ProfileInfo user={profileData} t={t} />
        )}
      </PageLayout>
    </>
  );
}

export default memo(Profile);
