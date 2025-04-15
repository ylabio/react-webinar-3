import useRequireAuth from '../../hooks/useRequireAuth';
import ProfilePage from '../../components/profile';
import { useEffect } from 'react';

function ProfileContainer() {
  const { token, user, loading, error } = useRequireAuth();

  if (loading) return <div>Загрузка профиля...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!user || !user.profile) return <div>Профиль не найден</div>;

  return <ProfilePage user={user} />;
}

export default ProfileContainer;
