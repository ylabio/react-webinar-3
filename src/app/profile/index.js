import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function ProfilePage() {
  const store = useStore();
  const navigate = useNavigate();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if (!user.token) {
      navigate('/login');
      return;
    }

    if (!user.data) {
      store.actions.user.loadProfile().then(success => {
        if (!success) navigate('/login');
      });
    }
  }, []);

  if (!user.data) {
    return (
      <PageLayout>
        <div className="profile-page">Загрузка профиля...</div>
      </PageLayout>
    );
  }

  const { email, username, profile } = user.data;

  return (
    <PageLayout>
      <div className="profile-page">
        <h1>Профиль</h1>
        <p>
          <strong>Имя:</strong> {profile?.name || '—'}
        </p>
        <p>
          <strong>Фамилия:</strong> {profile?.surname || '—'}
        </p>
        <p>
          <strong>Email:</strong> {email || '—'}
        </p>
        <p>
          <strong>Логин:</strong> {username || '—'}
        </p>
      </div>
    </PageLayout>
  );
}

export default memo(ProfilePage);
