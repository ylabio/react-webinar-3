import {memo} from 'react';
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from '../../containers/locale-select';
import ProfilePage from '../../components/profile-page';
import AuthButtons from '../../containers/auth-buttons';

function Profile() {

  const select = useSelector(state => ({
    userData: state.login.userData
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <AuthButtons></AuthButtons>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation></Navigation>
      <ProfilePage
        title={t('profile.title')} name={t('profile.name')} phone={t('profile.phone')}
        userData={select.userData}></ProfilePage>
    </PageLayout>
  )
}

export default memo(Profile);