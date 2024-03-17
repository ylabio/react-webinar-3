import React, {memo, useEffect} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import ProfileInfo from '../../components/profile-info';
import AuthMenu from "../../containers/auth-menu";
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from 'react-router-dom';

const UserProfile = () => {
	const navigate = useNavigate();

	const select = useSelector(state => ({
    user: state.auth.user
  }));

	useEffect(() => {
    if (!select.user) {
      navigate('/login')
    }
  }, [select.user]);

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo user={select.user} t={t} />
    </PageLayout>
  )
};

export default memo(UserProfile);