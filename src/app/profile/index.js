import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';

import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import AuthSlot from '../../components/auth-slot';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileInfo from '../../components/profile-info';
import { number } from 'prop-types';

function ProfilePage() {
  const user = useSelector(state => state.user);
  const { t } = useTranslate();

  if (!user.data) {
    return (
      <>
        <Head title={t('title')} authSlot={<AuthSlot />}>
          <LocaleSelect />
        </Head>
        <PageLayout>
          <div className="profile-page">Загрузка профиля...</div>
        </PageLayout>
      </>
    );
  }

  const { email, username, profile } = user.data;

  return (
    <>
      <Head title={t('title')} authSlot={<AuthSlot />}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileInfo profile={profile} username={username} email={email} number={number} />
      </PageLayout>
    </>
  );
}

export default memo(ProfilePage);
