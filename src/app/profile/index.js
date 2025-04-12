import React from 'react';
import { memo,  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import ProfileDetails from '../../components/profile-details'
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import LocaleSelect from '../../containers/locale-select';

const Profile = () => {
  const select = useSelector(state => ({
    token: state.user.token,
    user: state.user.user,
    loading: state.user.loading,
  }));

  useEffect(() => {
    if (!select.token) {
      navigate('/login');
    }
  }, [select.token]);

  const { t } = useTranslate();

  return (
    <>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <PageLayout>
        <Navigation />
        <ProfileDetails user={select.user}/>
      </PageLayout>
    </>
  );
};

export default memo(Profile);
