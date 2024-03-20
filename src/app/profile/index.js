import { memo, useEffect, useMemo } from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import ProfileBar from '../../containers/profile-bar';
import LocaleSelect from "../../containers/locale-select";
import ProfileInfo from '../../components/profile-info';

const Profile = () => {

  const select = useSelector(state => ({
    user: state.user.user,
    waiting: state.user.waiting,
  }));

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