import React, {useCallback, useEffect} from 'react';
import ProfileBar from "../../components/profile-bar";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import ProfileInfo from "../../components/profile-info";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import { Navigate } from 'react-router-dom';
import useTranslate from "../../hooks/use-translate";
import ProfileSection from "../../containers/profile-bar";

const  Profile = () => {
  const store = useStore();
  const {t} = useTranslate();

  useEffect(()=>{
    store.actions.user.checkAuth();
    store.actions.profile.load();
  },[])

  const select = useSelector(state => ({
    isLogin: state.user.authorized,
    user: state.profile.data,
  }));

  if (!select.isLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <ProfileSection/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <ProfileInfo user={select.user}/>
    </PageLayout>
  );
};

export default  Profile;