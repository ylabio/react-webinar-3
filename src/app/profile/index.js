import { useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';
import './style.css';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';

function Profile() {
  const store = useStore();
  const navigate = useNavigate();
  const { token, user, loading, error } = useSelector(s => s.auth);

  const { t } = useTranslate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (!user && !loading) {
      store.actions.auth.fetchProfile();
    }
  }, [token, user, loading, store, navigate]);

  // Если данные пользователя еще загружаются
  if (loading) return <div>{t('profile.loading')}</div>;

  // Если произошла ошибка
  if (error)
    return (
      <div>
        {t('profile.error')} {error}
      </div>
    );

  // Если нет данных профиля
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

export default Profile;
