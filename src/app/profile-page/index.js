import {memo} from 'react';
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from '../../hooks/use-init';
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import AuthControl from '../../containers/auth-control';
import ProfileDetail from '../../components/profile-detail';

function ProfilePage() {

  const store = useStore();

  useInit(() => {
    store.actions.profile.getUser();
  }, []);

 
  const select = useSelector(state => ({
    userData: state.profile.userData, 
    isAuth: state.user.isAuth, 
  }));  
  
  const {t} = useTranslate();

  return (   
    <PageLayout>
      <AuthControl />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>   
      <Navigation />  
      <ProfileDetail userData={select.userData}/>   
    </PageLayout>  
  );
}

export default memo(ProfilePage);
