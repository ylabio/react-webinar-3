import {memo} from 'react';
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import useInit from '../../hooks/use-init';

import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import ProfileCard from "../../components/profile-card";

function Profile() {
  const {t} = useTranslate();
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  }, []);

  const select = useSelector(state => ({
    user: state.profile.user,
    isExist: state.profile.isExist,
  }));

  return (
    <PageLayout>
      <LoginMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={select.user} isExist={select.isExist} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);
