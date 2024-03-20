import {memo, useEffect} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import LoginBanner from "../../containers/login-banner";
import ProfileCard from "../../components/profile-card";

function Profile() {
  const store = useStore();

  useEffect(() => {
    store.actions.profile.getUserInfo()
  }, [])

  const select = useSelector(state => ({
    userInfo: state.profile.userInfo,
    waiting: state.profile.waiting
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <LoginBanner/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileCard userInfo={select.userInfo} t={t}/>
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
