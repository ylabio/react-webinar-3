import { useEffect } from 'react';
import useRequireAuth from '../../hooks/useRequireAuth';
import useTranslate from '../../hooks/use-translate';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import { useNavigate } from 'react-router-dom';
import './style.css';

function ProfilePage() {
  const { token, user, loading, error } = useRequireAuth();
  const { t } = useTranslate();
  const navigate = useNavigate();

  if (loading) return <div>{t('profile.loading')}</div>;

  if (error || !token) {
    navigate('/login');
    return null;
  }

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
        <h2 className="ProfileTitle">{t('profile.title')}</h2>
        <div className="ProfileLayout">
          <div className="ProfileLayout-prop ">
            <div className="ProfileLayout-label">{t('profile.name')}:</div>
            <div className="ProfileLayout-value">{profile.name}</div>
          </div>
          <div className="ProfileLayout-prop">
            <div className="ProfileLayout-label">{t('profile.phone')}:</div>
            <div className="ProfileLayout-value">{profile.phone}</div>
          </div>
          <div className="ProfileLayout-prop">
            <div className="ProfileLayout-label">{t('profile.email')}:</div>
            <div className="ProfileLayout-value">{user.email}</div>
          </div>
        </div>
      </PageLayout>
    </div>
  );
}

export default ProfilePage;
