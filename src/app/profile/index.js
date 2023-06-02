import React from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import LocaleSelect from "../../containers/locale-select";
import Navigation from "../../containers/navigation";
import UserHeader from "../../containers/user-header";
import useTranslate from "../../hooks/use-translate";
import useSelector from "../../hooks/use-selector";
import UserInfo from "../../components/user-info";

const Profile = () => {

  const {t} = useTranslate();
  const select = useSelector(state => ({
    user: state.user.user
  }))

  const userInfoList = [
    {
      title: t('profile.name'),
      info: select.user.profile.name
    },
    {
      title: t('profile.phone'),
      info: select.user.profile.phone
    },
    {
      title: 'email',
      info: select.user.email
    },
  ]

  return (
    <PageLayout>
      <UserHeader />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserInfo title={t("profile")} userInfoList={userInfoList}/>
    </PageLayout>
  );
};

export default Profile;
