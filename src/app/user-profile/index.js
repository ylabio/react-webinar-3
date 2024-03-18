import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import AuthHeader from '../../components/auth-header';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import UserProfileForm from '../../components/user-profile-form';

const UserProfile = () => {
  const select = useSelector(state => ({    
    user: state.auth.user,
    token: state.auth.token    
  }));

  const { t } = useTranslate();

  if (!select.token) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <AuthHeader />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserProfileForm user={select.user} t={t} />
    </PageLayout>
  );
};

export default memo(UserProfile);