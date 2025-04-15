import { useEffect } from 'react';
import useRequireAuth from '../../hooks/useRequireAuth';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const { token, user, loading, error } = useRequireAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  // Если данные еще загружаются
  if (loading) return <div>{t('profile.loading')}</div>;

  // Если произошла ошибка или токен невалиден, редиректим на страницу логина
  if (error || !token) {
    navigate('/login');
    return null; // Можно также добавить сообщение об ошибке
  }

  // Если нет данных пользователя
  if (!user || !user.profile) {
    return <div>{t('profile.noProfile')}</div>;
  }

  const { profile } = user;

  return (
    <div>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <div className="profile-container">
          <h2>{t('profile.title')}</h2>
          <div className="profile-details">
            <div className="profile-info">
              <p>
                {t('profile.name')}: <strong>{profile.name}</strong>
              </p>
              <p>
                {t('profile.phone')}: <strong>{profile.phone}</strong>
              </p>
              <p>
                {t('profile.email')}: <strong>{user.email}</strong>
              </p>
            </div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default ProfilePage;
