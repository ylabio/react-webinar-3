import { memo } from "react"
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import ProfileCard from "../../components/profile-card";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";

function Profile() {
  const store = useStore()

  const select = useSelector(state =>({
    user: state.login.loginData
  }))
  
  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileCard profile={select.user} />
    </PageLayout>
  )
}

export default memo(Profile);