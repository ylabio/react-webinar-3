import { memo } from "react";
import PageLayout from "../../components/page-layout";
import ProfileTools from "../../containers/profile-tools";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import Navigation from "../../containers/navigation";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import ProfileCard from "../../components/profile-card";


function Profile() {
  const store = useStore();
  const {t} = useTranslate();
  const select = useSelector(state => ({
    user: state.profile.user,
  }));
  
  return(
    <PageLayout>
      <ProfileTools/>
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileCard user={select.user} t={t}/>
    </PageLayout>
  );
}

export default memo(Profile);