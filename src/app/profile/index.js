import AuthMenu from '../../containers/auth-menu'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import Spinner from "../../components/spinner";
import LocaleSelect from "../../containers/locale-select";
import ProfileCard from '../../components/profile-card';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';


const Profile = () => {

  const store = useStore();
  const {t} = useTranslate()

  const {pending, userData} = useSelector(state => ({
    pending: state.profile.pending,
    userData: state.profile.userData
  }))

  useInit(() => {
    store.actions.profile.getUserData()
  }, [])

  return (
    <PageLayout>
      <AuthMenu/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <Spinner active={pending}>
        <ProfileCard data={userData}/>
      </Spinner>
    </PageLayout>
  )
}

export default Profile