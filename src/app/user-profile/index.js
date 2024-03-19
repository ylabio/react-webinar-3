import React, {memo} from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import UserProfileView from '../../components/user-profile-view';
import Spinner from '../../components/spinner';
import AuthPanel from '../../containers/auth-panel';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

const UserProfile = () => {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.actions.userProfile.fetchProfile();
  }, []);

  const select = useSelector(state => ({    
    profile: state.userProfile.profile,
    waiting: state.userProfile.waiting
  }));  

  return (
    <PageLayout>   
      <AuthPanel />    
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserProfileView user={select.profile} t={t} />
      </Spinner>
    </PageLayout>  
  )
};

export default memo(UserProfile);