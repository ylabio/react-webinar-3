import { memo, useEffect } from 'react';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import AuthHeaderContainer from '../../containers/auth-header';
import Profile from '../../containers/profile';
import useAuth from '../../hooks/use-auth';

function ProfilePage() {
  const { t } = useTranslate();
  useEffect(() => {
    document.title = t('title');
  }, []);

  useAuth();

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
