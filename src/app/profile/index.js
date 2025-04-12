import { memo } from 'react';
import useSelector from '../../hooks/use-selector';
import useAuthSlotProps from '../../hooks/use-auth-slot';
import PageLayout from '../../components/page-layout';
import Navigation from '../../containers/navigation';
import ProfileInfo from '../../components/profile-info';
import AuthSlot from '../../components/auth-slot';
import AppLayout from '../../components/app-layout';
import useTranslate from '../../hooks/use-translate';
import LocaleSelect from '../../containers/locale-select';

function ProfilePage() {
  const profile = useSelector(state => state.profile);
  const { t } = useTranslate();
  const { isLoading, isAuthorized, isUnauthorized, username, handleLogout } = useAuthSlotProps();

  const auth = (
    <AuthSlot
      isLoading={isLoading}
      isAuthorized={isAuthorized}
      isUnauthorized={isUnauthorized}
      username={username}
      onLogout={handleLogout}
    />
  );

  return (
    <AppLayout title={t('title')} authSlot={auth} headChildren={<LocaleSelect />}>
      <PageLayout>
        <Navigation />
        {profile.data ? (
          <ProfileInfo
            profile={profile.data.profile}
            username={username}
            email={profile.data.email}
          />
        ) : (
          <div className="profile-page">Загрузка профиля...</div>
        )}
      </PageLayout>
    </AppLayout>
  );
}

export default memo(ProfilePage);
