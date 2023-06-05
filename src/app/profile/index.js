import React from "react";
import Head from "../../components/head";
import PageLayout from "../../components/page-layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../containers/login-menu";
import Navigation from "../../containers/navigation";
import ProfileDetails from "../../containers/profile-details";
import useTranslate from "../../hooks/use-translate";

const Profile = () => {
  const { t } = useTranslate();

  return (
    <PageLayout>
      <LoginMenu />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <ProfileDetails />
    </PageLayout>
  );
};

export default Profile;