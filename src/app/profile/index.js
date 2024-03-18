import { memo } from "react"
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/spinner";

function Profile() {
  const navigate = useNavigate();
  
  const select = useSelector(state =>({
    user: state.login.loginData,
    loading: state.login.waiting,
  }))

  useInit(() => {
    if (!select.user.profile) {
      navigate('login');
      return null;
    }
  }, [select.user.profile, navigate])
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.loading}>
        <ProfileCard profile={select.user} />
      </Spinner>
    </PageLayout>
  )
}

export default memo(Profile);