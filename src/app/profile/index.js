import React, { useState, memo, useCallback } from "react";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import useTranslate from "../../hooks/use-translate";
import UserProfile from "../../components/user-profile";
import AuthBtn from "../../containers/auth-btn";

const Profile = () => {
  const store = useStore();

  const select = useSelector((state) => ({
    profile: state.profile.profile,
    waiting: state.profile.waiting,
  }));

  useInit(async () => {
    await store.actions.profile.fetchProfile();
  }, []);

  const { t } = useTranslate();

  return (
    <PageLayout>
      <AuthBtn />
      <Head title={t("title")}>
        <LocaleSelect />
      </Head>
      <Navigation />
      {select.waiting ? (
        "Загрузка..."
      ) : (
        <UserProfile user={select.profile} t={t} />
      )}
    </PageLayout>
  );
};

export default memo(Profile);
