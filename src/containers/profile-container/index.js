import { memo } from 'react';
import ProfilePage from '../../app/profile';
import useSelector from '../../hooks/use-selector';

/**
 * Контейнер для защищённого доступа к профилю
 * Но if (!token) уже обрабатывается в useSessionGuard
 */
function ProfileContainer() {
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);

  // Логика проверок уже в useSessionGuard
  if (!user.token) {
    return null; // useSessionGuard сделает редирект
  }

  if (!profile.data) {
    return <div className="profile-page">Загрузка профиля...</div>;
  }

  return <ProfilePage />;
}

export default memo(ProfileContainer);
