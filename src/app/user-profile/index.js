import React, {memo} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import AuthHeader from '../../components/auth-header';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import UserProfileForm from '../../components/user-profile-form';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import Spinner from '../../components/spinner';

const UserProfile = () => {

  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.actions.profile.fetchProfile();
  }, []);

  const select = useSelector(state => ({    
    user: state.profile.profile,
    waiting: state.profile.waiting
  }));  

  return (
    <PageLayout>   
      <AuthHeader />    
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <UserProfileForm user={select.user} t={t} />
      </Spinner>
    </PageLayout>  
  )
};

export default memo(UserProfile);