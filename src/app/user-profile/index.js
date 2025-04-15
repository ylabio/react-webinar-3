import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import { useUser } from '../../hooks/use-user';
import { useSession } from '../../hooks/use-session';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Head from '../../components/head';
import LoginHeader from '../../containers/login-header-container';
import Spinner from '../../components/spinner';
import Navigation from '../../containers/navigation';
import './style.css';

function UserProfile() {
  const { t } = useTranslate();
  const navigate = useNavigate();
  const { user, loading, error } = useUser();
  const { token } = useSession();

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    }
  }, [loading, token, user, error, navigate]);
  

  if (loading) {
    return (
      <>
        <LoginHeader />
        <Head title={t('title')}>
          <LocaleSelect />
        </Head>
        <PageLayout>
          <Spinner />
        </PageLayout>
      </>
    );
  }

  const email = user?.email;

  return (
    <>
      <LoginHeader />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <div className="profile-container">
          <h1 className="profile-heading">{t('profile.heading')}</h1>
          <div className="profile-info">
            <div className="ItemDetail__label">{t('profile.name')}:</div>
            <div className="ItemDetail__value">
              {user.profile.name || 'Не указан'}
            </div>
            <div className="ItemDetail__label">{t('profile.phone')}:</div>
            <div className="ItemDetail__value">
              {user.profile.phone || 'Не указан'}
            </div>
            <div className="ItemDetail__label">Email:</div>
            <div className="ItemDetail__value">
              {email || 'Не указан'}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default memo(UserProfile);
