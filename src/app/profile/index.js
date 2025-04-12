import { memo, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import ProtectedRoute from '../../containers/protected-route';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import ProfileCard from '../../components/profile-card';

/**
 * Страница профиля
 */
function Profile() {
  const store = useStore();

  const select = useSelector(state => ({
    user: state.user.profile,
    waiting: state.user.waiting,
  }));

  const { t } = useTranslate();
  return (
    <ProtectedRoute user={select.user}>
      <Head title={t('title')}>
      </Head>
      <PageLayout>
        <Navigation />
        <Spinner active={select.waiting}>
          <ProfileCard user={select.user} />
        </Spinner>
      </PageLayout>
    </ProtectedRoute>
  );
}

export default memo(Profile);
