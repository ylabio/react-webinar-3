import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import LocaleSelect from '../../containers/locale-select';
import Header from '../../containers/header';
import ProfileCard from '../../components/profile-card';
import useAuth from '../../hooks/use-auth';

function Profile() {
  console.log('profile');
  // const navigate = useNavigate();
  const store = useStore();
  // const { auth, waiting } = useAuth();
  const select = useSelector((state) => ({
    isAuth: state.user.isAuth,
    profile: state.profile.profile,
    waiting: state.profile.waiting,
    userWaiting: state.user.waiting,
  }));

  useInit(() => {
    // auth();
    // if (!select.isAuth) {
    //   auth();
    //   if (!select.isAuth && !select.userWaiting) return navigate('/login');
    // }
    // console.log(waiting);
    // console.log(select.userWaiting, select.isAuth, 'PROFILE');

    store.actions.profile.load();
  }, []);

  const { t } = useTranslate();

  return (
    <PageLayout head={<Header />}>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.userWaiting} hide={true}>
        <ProfileCard profile={select.profile} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
