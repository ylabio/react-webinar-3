import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import ProfilePage from '../../app/profile';
/**
 * Контейнер для защищённого доступа к профилю
 */
function ProfileContainer() {
  const store = useStore();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user.token && !user.data) {
      store.actions.user.loadProfile();
    }
  }, [user.token, user.data]);

  useEffect(() => {
    if (!user.token) {
      navigate('/login', { replace: true });
    }
  }, [user.token, navigate]);

  if (user.token && !user.data) {
    return <div className="profile-page">Загрузка профиля...</div>;
  }

  return <ProfilePage />;
}

export default ProfileContainer;
