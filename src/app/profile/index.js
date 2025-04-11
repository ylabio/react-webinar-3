import { memo } from 'react';
import { Navigate } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthHeaderContainer from '../../containers/auth-header';
import Profile from '../../containers/profile';
import useSelector from '../../hooks/use-selector';

function ProfilePage() {
  const { t } = useTranslate();

  const select = useSelector(state => ({
    token: state.auth.token,
    initialized: state.auth.initialized,
  }));

  if (!select.token && select.initialized) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <AuthHeaderContainer />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <Profile />
      </PageLayout>
    </>
  );
}

export default memo(ProfilePage);
