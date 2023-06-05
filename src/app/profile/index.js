import {memo} from 'react';
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import LoginPanel from "../../containers/login-panel";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import ProfileInfo from "../../components/profile-info";
import useAuthorization from "../../hooks/use-authorization";

function Profile() {
  useAuthorization()

  const {t} = useTranslate();

  const select = useSelector(state => ({
    userInfo: state.profile.userInfo,
  }));

  return (
    <PageLayout>
      <LoginPanel/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileInfo data={select.userInfo}/>
    </PageLayout>
  );
}

export default memo(Profile);
