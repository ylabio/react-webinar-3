import React, { useState, memo, useCallback } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import AuthBtn from "../../components/auth-btn";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import UserProfile from "../../components/user-profile";

const Profile = () => {
  const select = useSelector((state) => ({
    username: state.auth.username,
  }));

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBtn />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <UserProfile username={select.username} t={t} />
    </PageLayout>
  );
};

export default memo(Profile);
