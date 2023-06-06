import {memo, useEffect} from 'react';
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import AuthMenu from '../../containers/auth-menu';
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from '../../hooks/use-init';


const authRoute = {
  login: '/login',
  profile: '/profile'
}

function Profile() {
  const {t} = useTranslate();
  const store = useStore();

  useInit(() => {
    store.actions.profile.getUserProfile()
  }, [], true);

  const select = useSelector((state) => ({
    profile: state.profile.profile,
  }));

  return (
    <PageLayout>
      <AuthMenu route={authRoute}/>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard t={t} profile={select.profile}/>
    </PageLayout>
  );
}

export default memo(Profile);
