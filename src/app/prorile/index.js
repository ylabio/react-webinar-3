import React, {memo} from 'react'
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import TopMenu from "../../containers/top-menu";
import ProfileLayout from "../../components/profile-layout";

const Profile = () => {

  const {t} = useTranslate();

  const select = useSelector(state => ({
    user: state.profile.user,
    waiting: state.profile.waiting,
    error: state.profile.error,
  }));


  return (
    <PageLayout>
      <TopMenu />
      <Head title={t('title')}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <ProfileLayout user={select.user ? select?.user : null} />
    </PageLayout>
  )
}
export default memo(Profile);
