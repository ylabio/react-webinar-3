import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import AuthorizationContainer from "../../containers/authorization-container";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import ProfileInfo from "../../components/profile-info";


function Profile() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.actions.profile.getProfile();
  }, []);

  const select = useSelector(state => ({
    profile: state.profile.data,
    waiting: state.profile.waiting,
  }));

  return (
    <PageLayout>
      <AuthorizationContainer/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={select.waiting}>
        <ProfileInfo profile={select.profile} name={t('profile.name')} phone={t('profile.phone')}/>
      </Spinner>
    </PageLayout>
  );
}

export default Profile;