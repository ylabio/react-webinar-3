import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import UserBar from '../../containers/user-bar';
import ProfileInfo from '../../components/profile-info';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';

function Profile() {
  const store = useStore()
  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.user.info,
    wait: state.user.waiting
  }));

  useInit(() => {
    store.actions.user.fetchInfo();
  }, [])

  return (
    <PageLayout>
      <UserBar />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation />
      <Spinner active={select.wait}>
        <ProfileInfo user={select.user}/>
      </Spinner>
    </PageLayout>
  );
}

export default Profile;
