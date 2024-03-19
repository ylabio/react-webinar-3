import {memo, useEffect} from 'react';
import useTranslate from "../../hooks/use-translate";
import useProfile from '../../hooks/use-profile';
import { useNavigate } from 'react-router-dom';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import ProfileBar from '../../containers/profile-bar';
import Spinner from "../../components/spinner";
import ProfileCard from '../../components/profile-card';

/**
 * Страница профиля
 */
function Profile() {

  const navigate = useNavigate();
  const profile = useProfile();
  const {t} = useTranslate();

  useEffect(
    () => {
      if (!profile.data && profile.isChecked) {
        navigate('/login/');
      }
    },
    [profile]
  )

  return (
    <PageLayout>
      <ProfileBar/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={profile.waiting}>
        <ProfileCard user={profile.data} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
