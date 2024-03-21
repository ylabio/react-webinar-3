import { memo } from "react"
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";

function Profile() {
  const store = useStore();
  
  const select = useSelector(state =>({
    user: state.profile.profileData,
    loading: state.profile.waiting,
  }))

  useInit(() => {
    store.actions.profile.getProfileData();
  }, [])
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.loading}>
        {select.user.profile && <ProfileCard profile={select.user} t={t} />}
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile);