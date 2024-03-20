import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from '../../hooks/use-selector';
import useTranslate from "../../hooks/use-translate";
import useInit from "../../hooks/use-init";
import Navigation from "../../containers/navigation";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from '../../containers/locale-select';
import ProfilePage from '../../components/profile-page';

function Profile() {

  const store = useStore();

  const select = useSelector(state => ({
    // name: state.login.userData.profile.name,
    // phone: state.login.userData.profile.phone,
    // email: state.login.userData.email,
    userData: state.login.userData
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')} link={'login'}>
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