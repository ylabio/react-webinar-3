import { memo, useEffect, useMemo } from 'react';
import useSelector from "../../hooks/use-selector";
import { useParams } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import ProfileBar from '../../containers/profile-bar';
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from '../../components/profile-info';

const Profile = () => {
  
  const store = useStore();
  const { userid } = useParams();

  useInit(() => {
    store.actions.profile.fetchUser(userid);
  }, [userid]);

  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
  }));

  useEffect(() => {
    return () => {
      store.actions.profile.clearUser();
    }
  }, []);

  const {t} = useTranslate();

  return (
  <PageLayout>
    <ProfileBar />
    <Head title={t('title')} >
      <LocaleSelect />
    </Head>
    <Navigation />
    <ProfileInfo 
      user={select.user} 
      labelProfile={t("profile.profile")}
      labelName={t("profile.name")}
      labelPhone={t("profile.phone")}
      labelEmail={t("profile.email")}
    />
  </PageLayout>
  );
}

export default memo(Profile);