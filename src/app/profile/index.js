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
      {select.user? <ProfileCard user={select.user} t={t}/> : <h1>Авторизируйтесь для просмотра профиля</h1>}
    </PageLayout>
  );
}

export default memo(Profile);