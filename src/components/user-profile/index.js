import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Head from '../../components/head';
import LoginHeader from '../../components/login-header';
import Spinner from '../../components/spinner';
import Navigation from '../../containers/navigation';
import './style.css';



function UserProfile() {

  const { t } = useTranslate();

  const navigate = useNavigate();
  const profileString = localStorage.getItem('profile');
  const profile = profileString ? JSON.parse(profileString) : null;
  const email = localStorage.getItem('email');

  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [navigate]);

  
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
            <div className="ItemDetail__value">{profile.name || 'Не указан'}</div>

            <div className="ItemDetail__label">{t('profile.phone')}:</div>
            <div className="ItemDetail__value">{profile.phone || 'Не указан'}</div>

            <div className="ItemDetail__label">Email:</div>
            <div className="ItemDetail__value">{email || 'Не указан'}</div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default memo(UserProfile);
