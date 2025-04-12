import { memo, useEffect } from 'react';
import ProfilePage from '../../app/profile';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

/**
 * Контейнер для защищённого доступа к профилю
 * Но if (!token) уже обрабатывается в useSessionGuard
 */
function ProfileContainer() {
  const user = useSelector(state => state.user);
  const profile = useSelector(state => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.token) {
      navigate('/login', { replace: true });
    }
  }, [user.token]);

  if (!user.token) return null;
  if (!profile.data) {
    return <div className="profile-page">Загрузка профиля...</div>;
  }

  return <ProfilePage />;
}

export default memo(ProfileContainer);
