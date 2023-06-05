import { Navigate } from 'react-router-dom';
import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import ProfileCard from '../../components/profile-card';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import UserControls from '../../containers/user-controls';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';

function Profile() {
  const store = useStore();

  useInit(() => {
    store.actions.profile.load();
  });

  const select = useSelector(state => ({
    profile: state.profile.profileData,
    waiting: state.profile.profileWaiting
  }));
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <UserControls />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {
        !select.waiting && <ProfileCard userInfo={select.profile} t={t} />
      }
    </PageLayout>
  );
}

export default Profile;
