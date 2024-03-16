import React, {memo} from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import UserProfileView from '../../components/user-profile-view';
import AuthPanel from '../../components/auth-panel';
import Navigation from "../../containers/navigation";
import LocaleSelect from '../../containers/locale-select';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";

const UserProfile = () => {
  const select = useSelector(state => ({    
    user: state.auth.user    
  }));  

  const {t} = useTranslate();

  return (
    <PageLayout>   
      <AuthPanel />    
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserProfileView user={select.user} t={t} />
    </PageLayout>  
  )
};

export default memo(UserProfile);